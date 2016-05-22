import React, { Component } from 'react';
import YoutubePlayer from './YoutubePlayer';
import NativePlayer from './NativePlayer';
import './Player.scss';

export const PLAYER_SOURCE_NATIVE='native';
export const PLAYER_SOURCE_YOUTUBE='youtube';

class Video extends Component {
  render() {
    const { source, url } = this.props;
    let video;

    switch (source) {
      case PLAYER_SOURCE_NATIVE:
        video = this.renderNative(url);
        break;
      case PLAYER_SOURCE_YOUTUBE:
        video = this.renderYoutube(url);
        break;
      default:
        video = this.renderUnsupported(url);
        break;
    }

    let classes = ['player-container'];

    classes.push(source);

    return (
      <div className={classes.join(' ')}>
        {video}
        {this.renderOverlay()}
      </div>
    )
  }

  renderOverlay() {
    return (
      <div>
        <button onClick={::this.handlePlay}>Play</button>
        <button onClick={::this.handlePause}>Pause</button>
      </div>
    );
  }

  renderYoutube(url) {
    return (
      <YoutubePlayer
        ref="player"
        url={url}
      />
    );
  }

  renderNative(url) {
    return (
      <NativePlayer
        ref="player"
        url={url}
      />
    );
  }

  renderUnsupported(url) {
    return (
      <div>
        <h1>Unsupported Source</h1>
      </div>
    );
  }

  handlePlay() {
    this.refs.player.playVideo();
  }

  handlePause() {
    this.refs.player.pauseVideo();
  }
}

export default Video;
