defmodule Poniverse do
  @moduledoc false

  use OAuth2.Strategy

  alias OAuth2.Strategy.AuthCode

  defp config do
    [strategy: Poniverse,
     site: "https://api.poniverse.net/v1",
     authorize_url: "https://poniverse.net/oauth/authorize",
     token_url: "https://poniverse.net/oauth/access_token"]
  end

  # Public API

  def client do
    config()
    |> Keyword.merge(Application.get_env(:lunatube, Poniverse.Auth))
    |> OAuth2.Client.new()
  end

  def authorize_url!(params \\ []) do
    client()
    |> put_param(:scope, "basic")
    |> OAuth2.Client.authorize_url!(params)
  end

  def get_token!(params \\ [], headers \\ [], options \\ []) do
    OAuth2.Client.get_token!(client(), params, headers, options)
  end

  # Strategy Callbacks

  def authorize_url(client, params) do
    AuthCode.authorize_url(client, params)
  end

  def get_token(client, params, headers) do
    client
    |> put_header("Accept", "application/json")
    |> AuthCode.get_token(params, headers)
  end
end
