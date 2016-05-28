import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactTimeout from 'react-timeout';
import NativeVideoPlayer, { PLAYER_SOURCE_NATIVE_VIDEO } from './Players/NativeVideoPlayer';
import NativeAudioPlayer, { PLAYER_SOURCE_NATIVE_AUDIO } from './Players/NativeAudioPlayer';
import YoutubePlayer, { PLAYER_SOURCE_YOUTUBE } from './Players/YoutubePlayer';
import _ from 'lodash';
import './Player.scss';
import { PLAYER_STATE_LOADING, PLAYER_STATE_PAUSED , PLAYER_STATE_PLAYING } from './Players/AbstractPlayer';
import ControlBar from './ControlBar/ControlBar';

class MediaPlayer extends Component {
  constructor() {
    super();

    this.state = {
      current: -1,
      duration: 0,
      setTime: 0,
      currentTimeTimer: 0,
      fullscreen: false,
      showControls: true
    };

    this.hideControls = _.debounce(::this.hideControls, 3000);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { state } = this.state;

    if (state !== PLAYER_STATE_LOADING) {
      if (state === PLAYER_STATE_PAUSED && nextProps.state === PLAYER_STATE_PLAYING) {
        this.startTimers();
      }

      if (state === PLAYER_STATE_PLAYING && nextProps.state === PLAYER_STATE_PAUSED) {
        this.stopTimers();
      }
    }
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

  handleFullscreenEvent() {
    this.setState({
      fullscreen: null !== document.fullscreenElement
    });
  }

  startTimers() {
    const currentTimeTimer = this.props.setInterval(::this.updateCurrentTime, 100);

    this.setState({
      currentTimeTimer
    });
  }

  stopTimers() {
    this.props.clearInterval(this.state.currentTimeTimer);

    this.setState({
      currentTimeTimer: 0
    });
  }

  handleOnMouseMove() {
    if (this.state.showControls === false) {
      this.setState({
        showControls: true
      });
    }

    // This is method is patched in the constructor to debounce
    // calls made to it
    this.hideControls();
  }

  hideControls() {
    this.setState({
      showControls: false
    });
  }

  handlePlayerReady(time) {
    this.setState({
      duration: time,
      state: PLAYER_STATE_PAUSED
    });
  }

  handleOnSeek(time) {
    const { onSeek } = this.props;

    if (onSeek) {
      onSeek(time);
    }

    this.updateCurrentTime();
  }

  updateCurrentTime() {
    this.refs.player.getCurrentTime().then(current => {
      this.setState({
        current
      });
    });
  }

  getPlayer() {
    const { source, url, state, currentTime } = this.props;

    const props = {
      url,
      state,
      setTime: currentTime,
      onReady: ::this.handlePlayerReady
    };

    switch (source) {
      case PLAYER_SOURCE_NATIVE_VIDEO:
        return (
          <NativeVideoPlayer
            ref="player"
            {...props}
          />
        );
      case PLAYER_SOURCE_NATIVE_AUDIO:
        return (
          <NativeAudioPlayer
            ref="player"
            {...props}
          />
        );
      case PLAYER_SOURCE_YOUTUBE:
        return (
          <YoutubePlayer
            ref="player"
            {...props}
          />
        );
      default:
        return (
          <div>
            <h1>Unsupported Source "{source}"</h1>
            <p>Unfortunately the entered source is not supported by our system.</p>
          </div>
        );
    }
  }

  render() {
    const { current, duration, showControls, fullscreen } = this.state;
    const { source, state, hideControls, onPlay, onPause } = this.props;
    const hideControlBar = state === PLAYER_STATE_PLAYING && !showControls;

    let containerClasses = ['player-container'];
    let playerClasses = ['player'];

    playerClasses.push(source ? source : 'unsupported');

    if (hideControlBar) {
      containerClasses.push('hide-mouse');
    }

    if (fullscreen) {
      containerClasses.push('fullscreen');
    }

    return (
      <div
        className={containerClasses.join(' ')}
        onMouseMove={::this.handleOnMouseMove}
      >
        <div className={playerClasses.join(' ')}>
          { this.getPlayer() }
        </div>
        <ControlBar
          playerState={state}
          currentTime={current}
          duration={duration}
          hidden={hideControlBar}
          hideControls={hideControls}
          isFullscreen={fullscreen}
          onPlay={onPlay}
          onPause={onPause}
          onSeek={::this.handleOnSeek}
          onFullscreen={::this.toggleFullScreen}
        />
      </div>
    )
  }
}

export default ReactTimeout(MediaPlayer);
