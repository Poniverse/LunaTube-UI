import React, { Component } from 'react';
import Youtube from 'react-youtube';
import './Video.scss';

export const VIDEO_SOURCE_NATIVE='native';
export const VIDEO_SOURCE_YOUTUBE='youtube';

class Video extends Component {
  render() {
    const { children, source } = this.props;
    let video;

    switch (source) {
      case VIDEO_SOURCE_NATIVE:
        video = this.renderNative();
        break;
      case VIDEO_SOURCE_YOUTUBE:
        video = this.renderYoutube();
        break;
      default:
        video = this.renderUnsupported();
        break;
    }

    return (
      <div className="container">
        {video}
        {this.renderOverlay()}
      </div>
    )
  }

  handlePlay() {
    this.refs.player._internalPlayer.playVideo();
  }

  handlePause() {
    this.refs.player._internalPlayer.pauseVideo();
  }

  renderOverlay() {
    return (
      <div>
        <button onClick={::this.handlePlay}>Play</button>
        <button onClick={::this.handlePause}>Pause</button>
      </div>
    );
  }

  renderYoutube() {
    const { url } = this.props;
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        controls: 0,
        modestbranding: true,
        iv_load_policy: 3,
        showinfo: 0,
        disablekb: 0,
        rel: 0
      }
    };

    return (
      <Youtube
        ref="player"
        videoId={url}
        opts={ opts }
        onReady={::this.onReady}
      />
    );
  }

  renderNative() {
    return (
      <div>
        <h1>Mythical Native Player</h1>
      </div>
    );
  }

  onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }


  renderUnsupported() {
    return (
      <div>
        <h1>Unsupported Source</h1>
      </div>
    );
  }
}

export default Video;
