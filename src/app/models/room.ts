export type VideoSource = 'youtube' | 'native_video' | 'native_audio';
export type PlayerState = 'playing' | 'paused' | 'loading' | 'stopped';

export interface IRoom {
  id: string;
  state: PlayerState;
  volume: number;
  syncTime: number;
  video: {
    url: string,
    source: VideoSource
  };
}

export interface IRoomAction {
  type: string;
  payload: {
    time?: number,
    volume?: number,
    state?: PlayerState,
    video?: {
      source: VideoSource,
      url: string,
    }
  };
}
