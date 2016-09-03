defmodule LunaTube.Router do
  use LunaTube.Web, :router

  pipeline :api do
    plug :accepts, ["json"]

    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource
  end

  scope "/", LunaTube do
    pipe_through :api

    get "/", HelloWorld, :index

    get "/auth", AuthController, :index
    get "/auth/callback", AuthController, :callback

    get "/auth/post_message", AuthController, :post_message
    get "/auth/post_message/iframe", AuthController, :post_message_iframe

    delete "/auth", AuthController, :logout

  end
end
