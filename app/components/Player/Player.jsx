import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactTimeout from 'react-timeout';
import NativePlayer from './NativePlayer';
import YoutubePlayer from './YoutubePlayer';
import moment from 'moment';
import _ from 'lodash';
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
      progressTimer: 0,
      fullscreen: false,
      showControls: true
    };

    this.hideControls = _.debounce(::this.hideControls, 3000);
  }

  componentDidMount() {
    if (document) {
      document.addEventListener('fullscreenchange', ::this.handleFullscreenEvent);
    }

    this.hideControls();
  }

  componentWillUnmount() {
    if (document) {
      document.removeEventListener('fullscreenchange', ::this.handleFullscreenEvent);
    }
  }

  handleFullscreenEvent() {
    this.setState({
      fullscreen: null !== document.fullscreenElement
    });
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

  handleOnMouseMove() {
    if (this.state.showControls !== true) {
      this.setState({
        showControls: true
      });
    }

    this.hideControls();
  }

  hideControls() {
    this.setState({
      showControls: false
    });
  }

  handlePlayerReady(time) {
    console.log('==> Ready', time);

    this.setState({
      duration: time,
      state: PLAYER_STATE_PAUSED
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
    let controlBarClasses = ['control-bar'];

    classes.push(source);

    if (this.state.state === PLAYER_STATE_PLAYING && !this.state.showControls) {
      controlBarClasses.push('hide-bar');
    }

    return (
      <div
        className="player-container"
        onMouseMove={::this.handleOnMouseMove}
        // onMouseEnter={::this.handleOnMouseEnter}
        // onMouseLeave={::this.handleOnMouseLeave}
      >
        <div className={classes.join(' ')}>
          {video}
        </div>
        <div className={controlBarClasses.join(' ')}>
          { this.state.state !== PLAYER_STATE_PLAYING ? this.renderPlayButton() : this.renderPauseButton()  }
          <button onClick={::this.logInfo}>
            <i className="fa fa-info-circle" />
          </button>
          <span>
            {Video.formatTime(this.state.current)} / {Video.formatTime(this.state.duration)} | {Math.floor(this.state.progress)}%
          </span>
          <button onClick={::this.toggleFullScreen} className="pull-right">
            <i className={this.state.fullscreen ? "fa fa-compress" : "fa fa-expand"} />
          </button>
        </div>
      </div>
    )
  }

  static formatTime(seconds) {
    const timestamp = moment(new Date).startOf('day').add(Math.floor(seconds), 'seconds');
    let format = 'mm:ss';

    if (timestamp.hour() > 0) {
      format = 'H:mm:ss';
    }

    return timestamp.format(format);
  }

  logInfo() {
    const currentTime = this.refs.player.getCurrentTime();
    const duration = this.refs.player.getDuration();

    duration.then(time => {
      console.log('==> Duration', time);
    });

    currentTime.then(time => {
      console.log('==> CurrentTime', time);
    });
  }

  toggleFullScreen() {
    if (!this.state.fullscreen) {
      // Full Screen
      const currentNode = ReactDOM.findDOMNode(this);
      currentNode.requestFullscreen();
    } else {
      // Exit Full Screen
      document.exitFullscreen();
    }
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
