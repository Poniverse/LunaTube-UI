import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactTimeout from 'react-timeout';
import InputRange from 'react-input-range';
import NativePlayer, { PLAYER_SOURCE_NATIVE } from './NativePlayer';
import YoutubePlayer, { PLAYER_SOURCE_YOUTUBE } from './YoutubePlayer';
import moment from 'moment';
import _ from 'lodash';
import './Player.scss';
import { PLAYER_STATE_LOADING, PLAYER_STATE_PAUSED , PLAYER_STATE_PLAYING } from './AbstractPlayer'

class Video extends Component {
  constructor() {
    super();

    this.state = {
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

    this.setState({
      currentTimeTimer,
      progressBarTimer
    });

    if (this.props.onPlay) {
      this.props.onPlay();
    }
  }

  handlePause() {
    this.props.clearInterval(this.state.currentTimeTimer);
    this.props.clearInterval(this.state.progressBarTimer);

    this.setState({
      currentTimeTimer: 0,
      progressBarTimer: 0
    });

    if (this.props.onPause) {
      this.props.onPause();
    }
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
    const { source, url, state } = this.props;

    const props = {
      url,
      state,
      onReady: ::this.handlePlayerReady
    };

    switch (source) {
      case PLAYER_SOURCE_NATIVE:
        return this.renderNative(props);
      case PLAYER_SOURCE_YOUTUBE:
        return this.renderYoutube(props);
      default:
        return this.renderUnsupported(props);
    }
  }

  render() {
    const { source } = this.props;
    const video = this.getPlayer();

    let containerClasses = ['player-container'];
    let playerClasses = ['player'];
    let controlBarClasses = ['control-bar'];

    playerClasses.push(source ? source : 'unsupported');

    if (this.props.state === PLAYER_STATE_PLAYING && !this.state.showControls) {
      containerClasses.push('hide-mouse');
      controlBarClasses.push('hide-bar');
    }

    return (
      <div
        className={containerClasses.join(' ')}
        onMouseMove={::this.handleOnMouseMove}
      >
        <div className={playerClasses.join(' ')}>
          {video}
        </div>
        <div className={controlBarClasses.join(' ')}>
          <div className="right-controls pull-right">
            <button onClick={::this.toggleFullScreen}>
              <i className={this.state.fullscreen ? "fa fa-compress" : "fa fa-expand"} />
            </button>
          </div>

          <div className="left-controls">
            { this.props.state !== PLAYER_STATE_PLAYING ? (
              <button className="play" onClick={::this.handlePlay}>
                <i className="fa fa-play" />
              </button>
            ) : (
              <button className="pause" onClick={::this.handlePause}>
                <i className="fa fa-pause" />
              </button>
            )  }
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

  renderYoutube(props) {
    return (
      <YoutubePlayer
        ref="player"
        {...props}
      />
    );
  }

  renderNative(props) {
    return (
      <NativePlayer
        ref="player"
        {...props}
      />
    );
  }

  renderUnsupported(props) {
    return (
      <div>
        <h1>Unsupported Source</h1>
        <p>Unfortunately the entered source is not supported by our system.</p>
      </div>
    );
  }
}

export default ReactTimeout(Video);
