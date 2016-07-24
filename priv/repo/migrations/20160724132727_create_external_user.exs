defmodule LunaTube.Repo.Migrations.CreateExternalUser do
  use Ecto.Migration

  def change do
    create table(:external_users) do
      add :user_id, :integer
      add :external_user_id, :integer
      add :type, :string
      add :service, :string
      add :access_token, :string
      add :refresh_token, :string
      add :expires, :datetime

      timestamps
    end
  end
end
