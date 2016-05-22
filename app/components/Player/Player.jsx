import React, { Component } from 'react';
import ReactTimeout from 'react-timeout';
import NativePlayer from './NativePlayer';
import YoutubePlayer from './YoutubePlayer';
import './Player.scss';

export const PLAYER_SOURCE_NATIVE='native';
export const PLAYER_SOURCE_YOUTUBE='youtube';
export const PLAYER_STATE_LOADING='loading';
export const PLAYER_STATE_PAUSED='paused';
export const PLAYER_STATE_PLAYING='playing';

class Video extends Component {
  constructor() {
    super();

    this.state = {
      state: PLAYER_STATE_LOADING,
      current: 0,
      duration: 0,
      progress: 0.00,
      progressTimer: 0
    }
  }

  handlePlay() {
    const intervalId = this.props.setInterval(::this.updateCurrentTime, 200);

    this.refs.player.playVideo();

    this.setState({
      state: PLAYER_STATE_PLAYING,
      progressTimer: intervalId
    });
  }

  handlePause() {
    this.props.clearInterval(this.state.progressTimer);

    this.refs.player.pauseVideo();

    this.setState({
      state: PLAYER_STATE_PAUSED,
      progressTimer: 0
    });
  }

  handleOnMouseEnter() {
    // console.log('==> Mouse entered player');
  }

  handleOnMouseLeave() {
    // console.log('==> Mouse left player');
  }

  handlePlayerReady(time) {
    console.log('==> Ready', time);

    this.setState({
      duration: time,
      state: PLAYER_STATE_PAUSED,
    });

  }

  updateCurrentTime() {
    this.refs.player.getCurrentTime().then(time => {
      this.setState({
        current: time,
        progress: (time / this.state.duration) * 100
      });
    });
  }

  getPlayer() {
    const { source, url } = this.props;

    switch (source) {
      case PLAYER_SOURCE_NATIVE:
        return this.renderNative(url);
      case PLAYER_SOURCE_YOUTUBE:
        return this.renderYoutube(url);
      default:
        return this.renderUnsupported(url);
    }
  }

  render() {
    const { source } = this.props;
    const video = this.getPlayer();

    let classes = ['player'];

    classes.push(source);

    console.log(this.state.progress);

    return (
      <div
        className="player-container"
        onMouseEnter={::this.handleOnMouseEnter}
        onMouseLeave={::this.handleOnMouseLeave}
      >
        <div className={classes.join(' ')}>
          {video}
        </div>
        <div className="control-bar">
          { this.state.state !== PLAYER_STATE_PLAYING ? this.renderPlayButton() : this.renderPauseButton()  }
          <button onClick={() => {
            const currentTime = this.refs.player.getCurrentTime();
            const duration = this.refs.player.getDuration();

            duration.then(time => {
              console.log('==> Duration', time);
            });

            currentTime.then(time => {
              console.log('==> CurrentTime', time);
            });
          }}>
            <i className="fa fa-info-circle" />
          </button>
          <span>
            {this.state.current.toFixed(0)} / {this.state.duration.toFixed(0)} | {this.state.progress.toFixed(0)}%
          </span>
        </div>
      </div>
    )
  }

  renderPlayButton() {
    return (
      <button className="play" onClick={::this.handlePlay}>
        <i className="fa fa-play" />
      </button>
    );
  }

  renderPauseButton() {
    return (
      <button className="pause" onClick={::this.handlePause}>
        <i className="fa fa-pause" />
      </button>
    );
  }

  renderYoutube(url) {
    return (
      <YoutubePlayer
        ref="player"
        url={url}
        onReady={::this.handlePlayerReady}
      />
    );
  }

  renderNative(url) {
    return (
      <NativePlayer
        ref="player"
        url={url}
        onReady={::this.handlePlayerReady}
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
}

export default ReactTimeout(Video);
