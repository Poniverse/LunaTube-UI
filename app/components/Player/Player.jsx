import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactTimeout from 'react-timeout';
import NativePlayer from './NativePlayer';
import InputRange from 'react-input-range';
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
      currentTimeTimer: 0,
      progressBarTimer: 0,
      fullscreen: false,
      showControls: true,
      slider: 0
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
    const currentTimeTimer = this.props.setInterval(::this.updateCurrentTime, 500);
    const progressBarTimer = this.props.setInterval(::this.updateProgressBar, 100);

    this.refs.player.playVideo();

    this.setState({
      state: PLAYER_STATE_PLAYING,
      currentTimeTimer,
      progressBarTimer
    });
  }

  handlePause() {
    this.props.clearInterval(this.state.currentTimeTimer);
    this.props.clearInterval(this.state.progressBarTimer);

    this.refs.player.pauseVideo();

    this.setState({
      state: PLAYER_STATE_PAUSED,
      currentTimeTimer: 0,
      progressBarTimer: 0
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
        current: time
      });
    });
  }

  updateProgressBar() {
    this.refs.player.getCurrentTime().then(time => {
      this.setState({
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
          <div className="right-controls pull-right">
            <button onClick={::this.toggleFullScreen}>
              <i className={this.state.fullscreen ? "fa fa-compress" : "fa fa-expand"} />
            </button>
          </div>

          <div className="left-controls">
            { this.state.state !== PLAYER_STATE_PLAYING ? this.renderPlayButton() : this.renderPauseButton()  }
            <span>
              {Video.formatTime(this.state.current)} / {Video.formatTime(this.state.duration)}
            </span>
          </div>

          <div className="slider">
            <InputRange
              maxValue={100}
              minValue={0}
              value={this.state.progress}
              onChange={::this.handleSliderChange}
            />
          </div>
        </div>
      </div>
    )
  }

  handleSliderChange(component, values) {
    // this.setState({
    //   slider: values
    // })
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
