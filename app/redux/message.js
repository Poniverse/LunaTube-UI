import { configureChannel } from './channel';

let channel = null;

export const ADD_MESSAGE = 'eqtv/message/add';

const initialState = [];

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
}

function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    message
  };
}

export function sendMessage(message) {
  return (dispatch, getState) => {
    let payload = {
      text: message
    };

    channel.push('new:message', payload)
      .receive('ok', response => {
        console.log('created MESSAGE', response);
      })
      .receive('error', error => {
        console.error(error);
        // dispatch(addTodoFailure(text, error));
      });
  };
}

export function subscribeMessage() {
  channel = configureChannel();

  return dispatch => {
    if (! channel) {
      // If there is no channel, this should be an indicator this is running in node and it shouldn't attempt to
      // communicate with the websockets connection, but there may be actual connection issues that leave this
      // variable null.
      // TODO: Investigate client connectivity issues
      return;
    }

    channel.on('new:message', message => dispatch(addMessage(message.text)));
  };
}
