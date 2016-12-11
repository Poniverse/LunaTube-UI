import * as React from 'react';
import { IRoom, IRoomAction } from '../../models/room';
import { bindActionCreators } from 'redux';
const { connect } = require('react-redux');
import { play, pause, seekTime, setVolume, setVideo }  from '../../redux/modules/room';
import { SOURCE_YOUTUBE }  from '../../models/player';
import { MediaPlayer } from '../../components';

interface IProps {
  room: IRoom;
  play: Redux.ActionCreator<IRoomAction>;
  pause: Redux.ActionCreator<IRoomAction>;
  seekTime: Redux.ActionCreator<IRoomAction>;
  setVolume: Redux.ActionCreator<IRoomAction>;
  setVideo: Redux.ActionCreator<IRoomAction>;
}

@connect(
  state => ({ room: state.room }),
  dispatch => bindActionCreators({
    play,
    pause,
    seekTime,
    setVolume,
    setVideo,
  }, dispatch)
)
class Home extends React.Component<IProps, any> {
  public componentWillMount() {
    const { setVideo } = this.props;

    // Youtube:
    //  - 0elg9WVytMs (Doin it Right - Sim Gretina)
    //  - JHGkaShoyNs (Greg Young - CQRS and Event Sourcing - Code on the Beach 2014) (Hour long video)
    // MP4:
    //  - http://www.w3schools.com/html/mov_bbb.mp4 - 10 second video
    //  - http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4
    // MP3:
    //  - https://pony.fm/t1183/dl.mp3
    //  - http://192.99.131.205:8000/stream.mp3

    setVideo(
      SOURCE_YOUTUBE,
      'Qi69aTLYF8E',
      246
    );

    // setVideo(
    //   SOURCE_NATIVE_VIDEO,
    //   'http://www.w3schools.com/html/mov_bbb.mp4',
    //   10
    // );

    // setVideo(
    //   SOURCE_NATIVE_AUDIO,
    //   'https://pony.fm/t1183/dl.mp3',
    //   226
    // );
  }

  public render() {
    const s = require('./style.css');

    return (
      <div className={s.home + ' container'}>
        <img src={require('./logo.svg')} />

        {this.renderPlayer()}
      </div>
    );
  }

  protected renderPlayer() {
    const { room, play, pause, seekTime, setVolume } = this.props;

    if (!room.video) {
      return null;
    }

    return (
      <MediaPlayer
        state={room.state}
        url={room.video.url}
        source={room.video.source}
        syncTime={room.syncTime}
        duration={room.video.duration}
        volume={room.volume}
        onPlay={play}
        onPause={pause}
        onSeek={seekTime}
        onVolumeChange={setVolume}
        onReady={this.handleOnReady.bind(this)}
        onEnd={this.handleOnEnd.bind(this)}
        hideControls={false}
      />
    );
  }

  public handleOnReady() {
    const { play } = this.props;

    play();
  }

  public handleOnEnd() {
    const { pause } = this.props;

    pause();
  }
}

export { Home }
