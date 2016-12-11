import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AbstractPlayer } from './AbstractPlayer';
import * as path from 'path';

class NativeVideoPlayer extends AbstractPlayer {
  protected player: any;

  public playVideo() {
    this.player.play();
  }

  public pauseVideo() {
    this.player.pause();
  }

  public syncTime(time) {
    this.player.currentTime = time;
  }

  public setVolume(volume) {
    this.player.volume = volume / 100;
  }

  public getCurrentTime() {
    return new Promise(resolve => {
      resolve(this.player.currentTime);
    });
  }

  public getDuration() {
    return new Promise(resolve => {
      resolve(this.player.seekable.end(0));
    });
  }

  public handleOnReady() {
    const { onReady } = this.props;

    this.getDuration().then(time => {
      onReady(time);
    });
  }

  public handleOnEnd() {
    const { onEnd } = this.props;

    onEnd();
  }

  public setPlayer(player) {
    if (this.player) {
      return;
    }

    this.player = ReactDOM.findDOMNode( player );
    this.player.addEventListener('loadedmetadata', this.handleOnReady.bind(this) );
    this.player.addEventListener('ended', this.handleOnEnd.bind(this) );
  }

  public render() {
    const { url } = this.props;
    const extension = path.extname(url).substr(1);

    return (
      <video
        ref={this.setPlayer.bind(this)}
      >
        <source src={url} type={'video/' + extension}/>
      </video>
    );
  }
}

export default NativeVideoPlayer;
