defmodule LunaTube.AuthController do
  use LunaTube.Web, :controller

  def index(conn, _params) do
    redirect conn, external: authorize_url!()
  end

  def callback(conn, %{"code" => code}) do
    token = get_token!(code)
    user = get_user!(token)

    json conn, user
  end

  defp authorize_url!(), do: Poniverse.authorize_url!
  defp get_token!(code), do: Poniverse.get_token!(code: code)

  defp get_user!(token) do
    {:ok, %{body: user}} = OAuth2.AccessToken.get(token, "/users/me")
    %{username: user["username"], display_name: user["display_name"], email: user["email"]}
  end
end
