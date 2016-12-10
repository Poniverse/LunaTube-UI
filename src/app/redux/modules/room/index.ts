import { IRoom, IRoomAction, VideoSource } from '../../../models/room';

export const SEEK_TIME = 'room/SEEK_TIME';
export const SET_STATE = 'room/SET_STATE';
export const SET_VOLUME = 'room/SET_VOLUME';
export const SET_VIDEO = 'room/SET_VIDEO';

const initialState: IRoom = {
  id: null,
  state: 'loading',
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
