defmodule LunaTube.AuthController do
  use LunaTube.Web, :controller

  alias LunaTube.User
  alias LunaTube.ExternalUser

  def index(conn, _params) do
    redirect conn, external: authorize_url!()
  end

  def callback(conn, %{"code" => code}) do
    token = get_token!(code)
    pv_user = get_user!(token)

    {:ok, lunatube_user} = create_lunatube_user(token, pv_user)
    {:ok, jwt, _full_claims} = lunatube_user |> Guardian.encode_and_sign(:token)

    render conn, "post_message.html", %{user: lunatube_user, token: jwt, layout: false}
  end

  def callback(conn, %{"error" => error, "error_description" => error_desc}) do
    render conn, "post_message_error.html", %{error: error, error_desc: error_desc, layout: false}
  end

  def post_message(conn, _params) do
    render conn, "iframe_container.html", %{layout: false}
  end

  def post_message_iframe(conn, _params) do
    redirect conn, external: authorize_url!()
  end

  defp authorize_url!(), do: Poniverse.authorize_url!()
  defp get_token!(code), do: Poniverse.get_token!(code: code)

  defp get_user!(token) do
    {:ok, %{body: user}} = OAuth2.AccessToken.get(token, "/users/me")
    %{id: user["id"], username: user["username"], display_name: user["display_name"], email: user["email"]}
  end

  defp create_lunatube_user(token, pv_user) do
    poniverse_user = ExternalUser
    |> ExternalUser.find_poniverse_user(pv_user.id)

    # Move the access token info into it's own struct
    token = %{
      access_token: token.access_token,
      refresh_token: token.refresh_token,
      expires: token.expires_at,
      type: token.token_type
    }

    # Change the expiry date from the token info from a unix timestamp into something that Ecto likes
    {_, token} = Map.get_and_update(token, :expires, fn current_value ->
      timestamp = current_value
      |> +(:calendar.datetime_to_gregorian_seconds({{1970, 1, 1}, {0, 0, 0}}))
      |> :calendar.gregorian_seconds_to_datetime
      {current_value, timestamp}
    end)

    case Repo.one(poniverse_user) do
      nil ->
        lt_user = User
        |> Repo.get_by(username: pv_user.username)

        case lt_user do
          nil ->
            lt_user = User.changeset(%User{}, pv_user)
            |> Repo.insert!()

            changeset = ExternalUser.changeset(%ExternalUser{}, Map.merge(token, %{
              service: "poniverse",
              external_user_id: pv_user.id,
              user_id: lt_user.id
            }))
            |> Repo.insert!()

            {:ok, lt_user}

          _ ->
            {:ok, lt_user}
        end

      poniverse_user ->
        poniverse_user
        |> ExternalUser.changeset(token)
        |> Repo.update!()

        lt_user = Repo.get!(User, poniverse_user.user_id)

        {:ok, lt_user}
    end

  end

end
