import { Socket } from 'phoenix-socket';

let socket;

if (!__ISSERVER__) {
  socket = new Socket('ws://' + window.location.hostname + ':4000/socket')
}

export default socket;
