import { Socket } from 'phoenix';

export function configureChannel() {
  if (__ISSERVER__) {
    return null;
  }

  let socket = new Socket('ws://localhost:4000/socket');
  socket.connect();

  let channel = socket.channel('messages:1');

  channel.on('new:message', msg => console.log('new:message', msg));

  channel.join()
    .receive('ok', messages => console.log('catching up', messages))
    .receive('error', reason => console.log('failed join', reason));
    // .after(10000, () => console.log('Networking issue. Still waiting...'));

  return channel;
}
