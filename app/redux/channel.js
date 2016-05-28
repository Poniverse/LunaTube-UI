import { configureChannelChannel } from './pheonixChannels';

let channel = null;

export const SYNC_TIME = 'eqtv/channel/sync';
export const BECOME_LEADER = 'eqtv/channel/becomeLeader';
export const ADD_TIMER = 'eqtv/channel/addTimer';
export const CLEAR_TIMER = 'eqtv/channel/clearTimer';
export const PLAY = 'eqtv/channel/play';
export const PAUSE = 'eqtv/channel/pause';

const initialState = {
  isLeader: false,
  currentTime: 0.00,
  leaderTimerId: 0,
  isPlaying: false
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case SYNC_TIME:
      return {
        ...state,
        currentTime: action.currentTime
      };
    case BECOME_LEADER:
      return {
        ...state,
        isLeader: action.isLeader
      };
    case ADD_TIMER:
      return {
        ...state,
        leaderTimerId: action.id
      };
    case CLEAR_TIMER:
      return {
        ...state,
        leaderTimerId: 0
      };
    case PLAY:
      return {
        ...state,
        isPlaying: true
      };
    case PAUSE:
      return {
        ...state,
        isPlaying: false
      };
    default:
      return state;
  }
}

function addTimer(id) {
  return {
    type: SYNC_TIME,
    id
  };
}

function clearTimer() {
  return {
    type: CLEAR_TIMER
  };
}

export function play(push = true) {
  return (dispatch, state) => {
    if (push &&  state().channel.isLeader) {
      channel.push('sync:play', {})
        .receive('ok', response => {
          console.log('sent play', response);
        })
        .receive('error', error => {
          console.error(error);
        });
    } else {
      dispatch({
        type: PLAY
      });
    }
  }
}

export function pause(push = true) {
  return (dispatch, state) => {
    if (push && state().channel.isLeader) {
      channel.push('sync:pause', {})
        .receive('ok', response => {
          console.log('sent pause', response);
        })
        .receive('error', error => {
          console.error(error);
        });
    } else {
      dispatch({
        type: PAUSE
      });
    }
  }
}

function syncTime(currentTime) {
  return {
    type: SYNC_TIME,
    currentTime
  };
}

export function becomeLeader() {
  return {
    type: BECOME_LEADER,
    isLeader: true
  };
}

function updateTime(currentTime) {
  return (dispatch, state) => {
    if (!state().channel) return;

    dispatch(syncTime(currentTime));
  }
}

export function seekTo(currentTime) {
  return (dispatch, getState) => {
    let payload = {
      currentTime
    };

    channel.push('sync:time', payload)
      .receive('ok', response => {
        console.log('sent time', response);
      })
      .receive('error', error => {
        console.error(error);
        // dispatch(addTodoFailure(text, error));
      });
  };
}

export function subscribeMessage() {
  channel = configureChannelChannel();

  return dispatch => {
    if (! channel) {
      // If there is no channel, this should be an indicator this is running in node and it shouldn't attempt to
      // communicate with the websockets connection, but there may be actual connection issues that leave this
      // variable null.
      // TODO: Investigate client connectivity issues
      return;
    }

    channel.on('update:time', message => dispatch(updateTime(message.currentTime)));
    channel.on('update:play', message => dispatch(play(false)));
    channel.on('update:pause', message => dispatch(pause(false)));
  };
}
