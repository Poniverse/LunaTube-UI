defmodule LunaTube.HelloWorld do
  use LunaTube.Web, :controller

  def index(conn, _params) do
    json conn, %{status: "Hello World!"}
  end

end
