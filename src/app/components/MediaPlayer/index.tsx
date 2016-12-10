import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as _ from 'lodash';
import {
  AbstractPlayer,
  YoutubePlayer,
  NativeVideoPlayer,
  NativeAudioPlayer,
  ControlBar,
} from '../';
import {
  PlayerState,
  STATE_PLAYING,
  SOURCE_YOUTUBE,
  SOURCE_NATIVE_AUDIO,
  SOURCE_NATIVE_VIDEO,
} from '../../models/player';
const styles = require('./style.css');
const cx = require('classnames/bind').bind(styles);

interface IProps {
  state: PlayerState;
  url: string;
  source: string;
  syncTime: number;
  duration: number;
  volume: number;
  hideControls: boolean;
  onReady: Function;
  onSeek: Function;
  onEnd: Function;
  onPlay: React.MouseEventHandler<HTMLButtonElement>;
  onPause: React.MouseEventHandler<HTMLButtonElement>;
  onVolumeChange: Function;
}

interface IState {
  currentTime?: number;
  fullscreen?: boolean;
  showControlBar?: boolean;
}

class MediaPlayer extends React.Component<IProps, IState> {
  protected player: AbstractPlayer;
  public state: IState = {
    currentTime: 0,
    fullscreen: false,
    showControlBar: true,
  };

  public constructor() {
    super();

    this.hideControlBar = _.debounce(this.hideControlBar.bind(this), 3000);
  }

  protected handlePlayerReady(duration: number) {
    this.props.onReady(duration);
  }

  protected handleOnSeek(time: number) {
    const { onSeek } = this.props;

    if (onSeek) {
      onSeek(time);
    }

    this.handleOnCurrentTimeUpdate(time);
  }

  protected handleOnCurrentTimeUpdate(time: number) {
    this.setState({
      currentTime: time,
    });
  }

  protected handleOnMouseMove() {
    if (this.state.showControlBar === false) {
      this.setState({
        showControlBar: true,
      });
    }

    // This is method is patched in the constructor to debounce
    // calls made to it
    this.hideControlBar();
  }

  protected hideControlBar() {
    this.setState({
      showControlBar: false,
    });
  }

  protected toggleFullScreen() {
    if (!this.state.fullscreen) {
      // Full Screen
      const currentNode = ReactDOM.findDOMNode(this);
      currentNode.requestFullscreen();
    } else {
      // Exit Full Screen
      document.exitFullscreen();
    }
  }

  protected setPlayer(player: AbstractPlayer) {
    this.player = player;
  }

  public render() {
    const { source, state, duration, volume, hideControls, onPlay, onPause, onVolumeChange } = this.props;
    const hideControlBar = state === STATE_PLAYING && ! this.state.showControlBar;

    let containerClasses = ['player-container'];
    let playerClasses = ['player'];

    playerClasses.push(source ? source : 'unsupported');

    if (hideControlBar) {
      containerClasses.push('hide-mouse');
    }

    // if (fullscreen) {
    //   containerClasses.push('fullscreen');
    // }

    return (
      <div
        className={cx(containerClasses)}
        onMouseMove={this.handleOnMouseMove.bind(this)}
      >
        <div className={cx(playerClasses)}>
          { this.renderPlayer() }
        </div>

        <ControlBar
          state={state}
          currentTime={this.state.currentTime}
          duration={duration}
          volume={volume}
          isFullscreen={false}
          hidden={hideControlBar}
          hideControls={hideControls}
          onPlay={onPlay}
          onPause={onPause}
          onVolumeChange={onVolumeChange}
          onSeek={this.handleOnSeek.bind(this)}
          onToggleFullscreen={this.toggleFullScreen.bind(this)}
        />
      </div>
    );
   }

   protected renderPlayer() {
    const { source, url, state, syncTime, volume, onEnd } = this.props;

    const props = {
      url,
      state,
      volume,
      onEnd,
      syncTime,
      onCurrentTimeUpdate: this.handleOnCurrentTimeUpdate.bind(this),
      onReady: this.handlePlayerReady.bind(this),
    };

    switch (source) {
      case SOURCE_NATIVE_VIDEO:
        return (
          <NativeVideoPlayer
            ref={this.setPlayer.bind(this)}
            {...props}
          />
        );
      case SOURCE_NATIVE_AUDIO:
        return (
          <NativeAudioPlayer
            ref={this.setPlayer.bind(this)}
            {...props}
          />
        );
      case SOURCE_YOUTUBE:
        return (
          <YoutubePlayer
            ref={this.setPlayer.bind(this)}
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
}

export { MediaPlayer }
