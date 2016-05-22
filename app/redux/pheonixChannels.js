import Socket from './socket';

export function configureMessageChannel() {
  if (__ISSERVER__) {
    return null;
  }

  Socket.connect();

  let channel = Socket.channel('messages:1');

  channel.on('new:message', msg => console.log('new:message', msg));

  channel.join()
    .receive('ok', messages => console.log('catching up', messages))
    .receive('error', reason => console.log('failed join', reason));
    // .after(10000, () => console.log('Networking issue. Still waiting...'));

  return channel;
}


export function configureChannelChannel() {
  if (__ISSERVER__) {
    return null;
  }

  Socket.connect();

  let channel = Socket.channel('players:1');

  channel.on('new:message', msg => console.log('new:message', msg));

  channel.join()
    .receive('ok', messages => console.log('catching up', messages))
    .receive('error', reason => console.log('failed join', reason));
    // .after(10000, () => console.log('Networking issue. Still waiting...'));

  return channel;
}
