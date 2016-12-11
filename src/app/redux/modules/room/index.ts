import {IRoom, IRoomAction, VideoSource} from '../../../models/room';
import Socket from '../../socket';

export const SEEK_TIME = 'room/SEEK_TIME';
export const SET_STATE = 'room/SET_STATE';
export const SET_VOLUME = 'room/SET_VOLUME';
export const SET_VIDEO = 'room/SET_VIDEO';
export const INIT_ROOM = 'room/SET_ROOM';

const initialState: IRoom = {
  id: null,
  state: 'loading',
  remoteState: null,
  volume: 100,
  syncTime: null,
  video: null,
};

export function reducer (state = initialState, action: IRoomAction) {
  switch (action.type) {
    case SEEK_TIME:
      return {
        ...state,
        syncTime: action.payload.time,
      };
    case SET_VOLUME:
      return {
        ...state,
        volume: action.payload.volume,
      };
    case SET_STATE:
      return {
        ...state,
        state: action.payload.state,
      };
    case SET_VIDEO:
      return {
        ...state,
        video: action.payload.video,
      };
    case INIT_ROOM:
      return {
        ...initialState,
        id: action.payload.id,
        remoteState: action.payload.state,
        video: action.payload.video,
        syncTime: action.payload.time,
      };
    default:
      return state;
  }
}

export function play(): IRoomAction {
  return {
    type: SET_STATE,
    payload: {
      state: 'playing',
    },
  };
}

export function pause(): IRoomAction {
  return {
    type: SET_STATE,
    payload: {
      state: 'paused',
    },
  };
}

export function setVideo(source: VideoSource, url: string, duration: number): IRoomAction {
  return {
    type: SET_VIDEO,
    payload: {
      video: {
        source,
        url,
        duration,
      },
    },
  };
}

export function setVolume(volume: number): IRoomAction {
  return {
    type: SET_VOLUME,
    payload: {
      volume,
    },
  };
}

export function seekTime(time: number): IRoomAction {
  return {
    type: SEEK_TIME,
    payload: {
      time,
    },
  };
}

export function joinRoom(id) {
  return dispatch => {
    Socket.connectToRoom(id, channel => {
      // Init

      channel.join()
        .receive('ok', (response) => {
          const action: IRoomAction = {
            type: INIT_ROOM,
            payload: {
              id,
              time: response.current_time,
              state: response.state,
              video: {
                source: response.source,
                url: response.url,
                duration: response.duration,
              },
            },
          };

          dispatch(action);
          console.log('==> Joined Room: ', response);
        });

        // TODO: Events from a leader in the channel.
    });
  };
}
