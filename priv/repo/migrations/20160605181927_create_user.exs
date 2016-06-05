defmodule LunaTube.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :username, :string
      add :display_name, :string
      add :email, :string

      timestamps
    end

  end
end
