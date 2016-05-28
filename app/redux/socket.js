import { Socket } from 'phoenix';

let socket;

if (!__ISSERVER__) {
  socket = new Socket('ws://' + window.location.hostname + ':4000/socket')
}

export default socket;