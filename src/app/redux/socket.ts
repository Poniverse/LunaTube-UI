const Socket = require('phoenix');

let applicationSocket;

if (process.env.BROWSER) {
  applicationSocket = new Socket('ws://' + window.location.hostname + ':4000/socket');
}

export default applicationSocket;
