import * as React from 'react';
import {
  PlayerState,
  STATE_PAUSED, STATE_LOADING,
} from '../../models/player';
import * as moment from 'moment';
import * as classNames from 'classnames';
const styles = require('./style.css');
const cx = require('classnames/bind').bind(styles);

interface IProps {
  state: PlayerState;
  currentTime: number;
  duration: number;
  volume: number;
  isFullscreen: boolean;
  hidden: boolean;
  hideSeekbar?: boolean;
  hideControls: boolean;
  onPlay: React.MouseEventHandler<HTMLButtonElement>;
  onPause: React.MouseEventHandler<HTMLButtonElement>;
  onSeek: Function;
  onToggleFullscreen: React.MouseEventHandler<HTMLButtonElement>;
  onVolumeChange: Function;
}

interface IState {
  showVolume: boolean;
}

class ControlBar extends React.Component<IProps, IState> {
  public state: IState = {
    showVolume: false,
  };

  protected formatTime(seconds) {
    const timestamp = moment(new Date()).startOf('day').add(Math.floor(seconds), 'seconds');

    let format = 'mm:ss';

    if (timestamp.hour() > 0) {
      format = 'H:mm:ss';
    }

    return timestamp.format(format);
  }

  protected renderPlayPause() {
    const { onPlay, onPause, state, hideControls, hideSeekbar } = this.props;

    if (hideSeekbar || hideControls) {
      return null;
    }

    if (state === STATE_PAUSED || state === STATE_LOADING) {
      return (
        <button className={cx('play')} onClick={onPlay}>
          &nbsp;
        </button>
      );
    } else {
      return (
        <button onClick={onPause}>
          <i className="fa fa-pause" />
        </button>
      );
    }
  }

  protected setVolume() {
    const { volume } = this.props;

    let setToVolume = 0;

    if (volume === 0) {
      setToVolume = 100;
    }

    this.handleVolume({ target: { value: setToVolume } });
  }

  protected handleSeek({ target: { value } }) {
    const { onSeek, duration } = this.props;
    const time = (value * duration) / 100;

    if (onSeek) {
      onSeek(time);
    }
  }

  protected handleVolume({ target: { value } }) {
    const { onVolumeChange } = this.props;

    if (onVolumeChange) {
      onVolumeChange(parseFloat(value));
    }
  }

  protected setVolumeVisibility = (visibility: string) => () => {
    this.setState({
      showVolume: visibility === 'visible',
    });
  };

  protected renderSeekbar() {
    const {
      currentTime,
      duration,
      hideControls,
      hideSeekbar,
    } = this.props;
    const isLiveMedia = duration === Infinity; // Live as in Livestream

    if (isLiveMedia || hideSeekbar || hideControls) {
      return null;
    }

    const progress = (currentTime / duration) * 100;

    return (
      <div className={cx('seekbar')}>
        <div className={cx('seekbar-progress')} style={{ width: progress + '%' }} />
        <input type="range" min="0.0" max="100" step="0.5"
          value={progress}
          onChange={this.handleSeek.bind(this)} />
      </div>
    );
  }

  public render() {
    const {
      currentTime,
      duration,
      hidden,
      isFullscreen,
      onToggleFullscreen,
      volume,
    } = this.props;

    const classes = cx({
      'control-bar': true,
      'hide-bar': hidden,
    });

    let volumeIconClasses = classNames({
      fa: true,
      'fa-volume-off': volume === 0.00,
      'fa-volume-down': volume > 0 && volume < 50,
      'fa-volume-up': volume >= 50,
    });

    volumeIconClasses += ' ' + cx('fa');

    return (
      <div className={cx(classes)}>
        <div className={cx('right-controls pull-right hidden')}>
          <button onClick={onToggleFullscreen}>
            <i className={isFullscreen ? 'fa fa-compress' : 'fa fa-expand'} />
          </button>
        </div>

        <div className={cx('left-controls')}>
          { this.renderPlayPause() }
          <div
            className={cx('volume-timestamp')}
            onMouseLeave={this.setVolumeVisibility('hidden')}
          >
            <button
              className={cx('volume')}
              onClick={this.setVolume.bind(this)}
              onMouseEnter={this.setVolumeVisibility('visible')}
            >
              <i className={volumeIconClasses} />
            </button>

            <span className={cx({timestamp: true, 'hide-timestamp': this.state.showVolume})}>
              {this.formatTime(currentTime > -1 ? currentTime : 0)} /
              { duration !== Infinity ? this.formatTime(duration) : 'LIVE' }
            </span>

            <div className={cx({seekbar: true, volume: true, 'hide-volume': !this.state.showVolume})}>
              <div className={cx('seekbar-progress')} style={{width:volume + '%'}} />
              <input type="range" min="0.0" max="100" step="5"
                value={volume}
                onChange={this.handleVolume.bind(this)}
              />
            </div>
          </div>
        </div>

        { this.renderSeekbar() }
      </div>
    );
  }
}

export { ControlBar };
