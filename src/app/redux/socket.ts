import { Socket as PheonixSocket } from 'phoenix';

interface ISocketOptions {
  params?: {
    token?: string;
  };
}

class Socket {
  protected socket: PheonixSocket;

  public connect(jwt?: string) {
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
  }

  public reconnect(jwt?: string) {
    this.socket.disconnect();
    this.socket = null;

    this.connect(jwt);
  }
}

export default new Socket();
