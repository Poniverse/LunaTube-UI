defmodule LunaTube.UserTest do
  use LunaTube.ModelCase

  alias LunaTube.User

  @valid_attrs %{display_name: "some content", email: "some content", username: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end
end
