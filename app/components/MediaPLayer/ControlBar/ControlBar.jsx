import React, {Component, PropTypes} from 'react';
import {PLAYER_STATE_LOADING, PLAYER_STATE_PAUSED, PLAYER_STATE_PLAYING} from '../Players/AbstractPlayer'
import moment from 'moment';
import classNames from 'classnames';

class ControlBar extends Component {
  static propTypes = {
    playerState: PropTypes.string.isRequired,
    currentTime: PropTypes.number.isRequired,
    duration: PropTypes.number,
    hidden: PropTypes.bool,
    hideControls: PropTypes.bool,
    isFullscreen: PropTypes.bool,
    showSeekbar: PropTypes.bool,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onSeek: PropTypes.func,
    onFullscreen: PropTypes.func
  };

  static defaultProps = {
    hidden: false,
    hideControls: false,
    showSeekbar: true,
    isFullscreen: false,
    volume: 100
  };

  constructor() {
    super();
    this.state = {
      showVolume: false
    };
  }

  formatTime(seconds) {
    const timestamp = moment(new Date).startOf('day').add(Math.floor(seconds), 'seconds');
    let format = 'mm:ss';

    if (timestamp.hour() > 0) {
      format = 'H:mm:ss';
    }

    return timestamp.format(format);
  }

  render() {
    const {
      playerState,
      currentTime,
      duration,
      hidden,
      hideControls,
      isFullscreen,
      showSeekbar,
      onPlay,
      onPause,
      onFullscreen,
      volume
    } = this.props;
    const progress = (currentTime / duration) * 100;
    const classes = ['control-bar'];
    const live = duration === Infinity;

    if (hidden) {
      classes.push('hide-bar');
    }

    return (
      <div className={classes.join(' ')}>
        <div className="right-controls pull-right">
          <button onClick={onFullscreen}>
            <i className={isFullscreen ? "fa fa-compress" : "fa fa-expand"} />
          </button>
        </div>

        <div className="left-controls">
          { showSeekbar && !hideControls ?
            (
              playerState === PLAYER_STATE_PAUSED ? (
                <button className="play" onClick={onPlay}>
                  &nbsp;
                </button>
              ) : (
                <button className="pause" onClick={onPause}>
                  <i className="fa fa-pause" />
                </button>
              )
            ) : null }
          <div
            className="volume-timestamp"
            onMouseLeave={() => {
              this.setState({showVolume: false});
            }}
          >
            <button
              className="volume"
              onClick={() => {
                let setToVolume = 0;

                if (volume === 0) {
                   setToVolume = 100;
                }

                this.handleVolume({target:{value: setToVolume}});
              }}
              onMouseEnter={() => {
                this.setState({showVolume: true});
              }}
            >
              <i className={classNames({
                fa: true,
                'fa-volume-off': volume === 0.00,
                'fa-volume-down': volume > 0 && volume < 50,
                'fa-volume-up': volume >= 50
              })} />
            </button>
            <span className={classNames({timestamp: true, 'hide-timestamp': this.state.showVolume})}>
              {this.formatTime(currentTime > -1 ? currentTime : 0)} / { duration !== Infinity ? this.formatTime(duration) : 'LIVE' }
            </span>
            <div className={classNames({seekbar: true, volume: true, 'hide-volume': !this.state.showVolume})}>
              <div className="seekbar-progress" style={{width:volume+"%"}}></div>
              <input type="range" min="0.0" max="100" step="5"
                value={volume}
                onChange={::this.handleVolume}
              />
            </div>
          </div>
        </div>

        { !live && showSeekbar && !hideControls ? (
          <div className="seekbar">
            <div className="seekbar-progress" style={{width:progress+"%"}}></div>
            <input type="range" min="0.0" max="100" step="0.5"
                   value={progress}
                   onChange={::this.handleSeek} />
          </div>
        ) : null }
      </div>
    );
  }

  handleSeek({ target: { value } }) {
    const { onSeek, duration } = this.props;
    const time = (value * duration) / 100;

    if (onSeek) {
      onSeek(time);
    }
  }

  handleVolume({ target: { value } }) {
    const { onVolumeChange } = this.props;

    if (onVolumeChange) {
      onVolumeChange(parseFloat(value));
    }
  }
}

export default ControlBar;
