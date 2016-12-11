import { Socket as PheonixSocket, Channel } from 'phoenix';

interface ISocketOptions {
  params?: {
    token?: string;
  };
}

interface IChannels {
  room: Channel;
}

class Socket {
  protected socket: PheonixSocket;
  protected channels: IChannels = {
    room: null,
  };
  protected reconnectCallbacks = [];

  public connectToRoom(id, callback: Function) {
    const reconnectCallback = () => {
      const channel = this.socket.channel('room:' + id);
      this.channels.room = channel;

      callback(channel);
    };

    this.reconnectCallbacks.push(reconnectCallback);

    reconnectCallback();
  }

  public connect(jwt?: string, reconnecting: boolean = false) {
    if (! process.env.BROWSER || this.socket) {
      return;
    }

    const data: ISocketOptions = {
      params: {},
    };

    if (jwt) {
      data.params.token = jwt;
    }

    this.socket = new PheonixSocket(
      'ws://' + window.location.hostname + ':4000/socket',
      data
    );
    this.socket.connect();

    if (reconnecting) {
      this.reconnectCallbacks.forEach(callback => {
        callback();
      });
    }
  }

  public reconnect(jwt?: string) {
    this.socket.disconnect();
    this.socket = null;

    this.connect(jwt, true);
  }
}

export default new Socket();
