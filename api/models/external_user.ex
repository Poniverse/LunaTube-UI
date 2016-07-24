defmodule LunaTube.ExternalUser do
  use LunaTube.Web, :model

  alias __MODULE__
  alias LunaTube.User

  schema "external_users" do
    field :user_id, :integer
    field :external_user_id, :integer
    field :type, :string
    field :service, :string
    field :access_token, :string
    field :refresh_token, :string
    field :expires, Ecto.DateTime

    timestamps
  end

  @required_fields ~w(user_id external_user_id type service access_token expires)
  @optional_fields ~w(refresh_token)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end

  def find_by_service_and_user(query \\ %ExternalUser{}, service, user_id) do
    from u in query,
    where: u.service == ^service and u.external_user_id == ^user_id
  end

  def find_poniverse_user(query \\ %ExternalUser{}, poniverse_user_id) do
    find_by_service_and_user(query, "poniverse", poniverse_user_id)
  end
end
