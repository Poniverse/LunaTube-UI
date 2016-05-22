defmodule LunaTube.PlayersChannel do
  use LunaTube.Web, :channel

  @current_time 14
  def current_time, do: @current_time

  def join("players:" <> player_id, _params, socket) do
    {:ok, assign(socket, :player_id, player_id) }
  end

  def handle_in("sync:time", params, socket) do
    broadcast! socket, "update:time", %{
      currentTime: params["currentTime"]
    }

    {:reply, :ok, socket}
  end

  def handle_in("sync:play", params, socket) do
    broadcast! socket, "update:play", %{}

    {:reply, :ok, socket}
  end

  def handle_in("sync:pause", params, socket) do
    broadcast! socket, "update:pause", %{}

    {:reply, :ok, socket}
  end
end
