defmodule LunaTube.ExternalUserTest do
  use LunaTube.ModelCase

  alias LunaTube.ExternalUser

  @valid_attrs %{access_token: "some content", expires: "2010-04-17 14:00:00", external_user_id: 42, refresh_token: "some content", service: "some content", type: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = ExternalUser.changeset(%ExternalUser{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = ExternalUser.changeset(%ExternalUser{}, @invalid_attrs)
    refute changeset.valid?
  end
end
