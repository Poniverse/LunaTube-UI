import { PlayerState } from './player';

export type VideoSource = 'youtube' | 'native_video' | 'native_audio';
export { PlayerState };

export interface IRoom {
  id: string;
  state: PlayerState;
  volume: number;
  syncTime: number;
  video: {
    url: string;
    source: VideoSource;
    duration: number;
  };
}

export interface IRoomAction {
  type: string;
  payload: {
    time?: number,
    volume?: number,
    state?: PlayerState,
    video?: {
      source?: VideoSource,
      url?: string,
      duration?: number,
    }
  };
}
