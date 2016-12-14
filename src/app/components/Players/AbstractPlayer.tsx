import * as React from 'react';
import { PlayerState, STATE_PAUSED, STATE_LOADING, STATE_PLAYING/*, STATE_STOPPED*/ } from '../../models/player';

interface IProps {
  syncTime: number;
  state: PlayerState;
  volume: number;
  onCurrentTimeUpdate: Function;
  onReady: Function;
  onEnd: Function;
  url: string;
  setInterval?: Function;
  clearInterval?: Function;
}

interface IPromise {
  time: number;
}

abstract class AbstractPlayer extends React.Component<IProps, any> {
  protected timer;

  public componentDidUpdate(prevProps: IProps) {
    const {state, syncTime, volume} = this.props;

    if (prevProps.volume !== volume) {
      this.setVolume(volume);
    }

    if (state === STATE_PLAYING && (prevProps.state === STATE_PAUSED || prevProps.state === STATE_LOADING)) {
      this.playVideo();
      this.startTimer();
    }

    if (state === STATE_PAUSED && prevProps.state === STATE_PLAYING) {
      this.endTimer();
      this.pauseVideo();
    }

    if (prevProps.syncTime !== syncTime || prevProps.state === STATE_LOADING) {
      this.syncTime(syncTime);
    }
  }

  protected updateCurrentTime() {
    this.getCurrentTime()
      .then(time => {
        this.props.onCurrentTimeUpdate(time);
      });
  }

  protected startTimer() {
    if (this.timer) {
      return;
    }

    this.timer = this.props.setInterval(this.updateCurrentTime.bind(this), 100);
  }

  protected endTimer() {
    if (this.timer) {
      this.props.clearInterval(this.timer);
      this.timer = null;
    }
  }

  protected abstract playVideo(): void;
  protected abstract pauseVideo(): void;
  protected abstract setVolume(volume: number): void;
  protected abstract syncTime(time: number): void;
  protected abstract getCurrentTime(): Promise<IPromise>;
  protected abstract getDuration(): Promise<IPromise>;
}

export { AbstractPlayer };
