defmodule LunaTube.User do
  use LunaTube.Web, :model

  @derive {Poison.Encoder, only: [:id, :username, :display_name, :email]}

  schema "users" do
    field :username, :string
    field :display_name, :string
    field :email, :string

    has_many :roles, LunaTube.UserRole

    timestamps
  end

  @required_fields ~w(username display_name email)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
