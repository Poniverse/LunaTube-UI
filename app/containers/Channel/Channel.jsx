import React, { Component } from 'react';
import ReactTimeout from 'react-timeout';
import { connect } from 'react-redux';
import MediaPlayer  from '../../components/MediaPlayer/MediaPlayer';
import { PLAYER_SOURCE_YOUTUBE }  from '../../components/MediaPlayer/Players/YoutubePlayer';
import { PLAYER_SOURCE_NATIVE_VIDEO }  from '../../components/MediaPlayer/Players/NativeVideoPlayer';
import { PLAYER_SOURCE_NATIVE_AUDIO }  from '../../components/MediaPlayer/Players/NativeAudioPlayer';
import { PLAYER_STATE_LOADING, PLAYER_STATE_PAUSED, PLAYER_STATE_PLAYING } from '../../components/MediaPlayer/Players/AbstractPlayer';
import { becomeLeader, subscribeMessage, addTimer, clearTimer, play, pause, seekTo, setVolume } from '../../redux/channel';

class Channel extends Component {

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(subscribeMessage());
  }

  handleOnPlay() {
    this.props.dispatch(play());
  }

  handleOnPause() {
    this.props.dispatch(pause());
  }

  handleOnSeek(time) {
    this.props.dispatch(seekTo(time));
  }

  handleOnVolumeChange(time) {
    this.props.dispatch(setVolume(time));
  }

  render() {
    const { dispatch, channel: { currentTime, isLeader, leaderTimerId, isPlaying, volume } } = this.props;

    let props = {};

    // Youtube:
    //  - 0elg9WVytMs (Doin it Right - Sim Gretina)
    //  - JHGkaShoyNs (Greg Young - CQRS and Event Sourcing - Code on the Beach 2014) (Hour long video)
    // MP4:
    //  - http://www.w3schools.com/html/mov_bbb.mp4 - 10 second video
    //  - http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4
    // MP3:
    //  - https://pony.fm/t1183/dl.mp3
    //  - http://192.99.131.205:8000/stream.mp3

    return (
      <div className="container">
        <div className="col-xs-12">
          <MediaPlayer
            ref="player"
            state={isPlaying ? PLAYER_STATE_PLAYING : PLAYER_STATE_PAUSED}
            url="http://www.w3schools.com/html/mov_bbb.mp4"
            source={PLAYER_SOURCE_NATIVE_VIDEO}
            currentTime={currentTime}
            volume={volume}
            onPlay={::this.handleOnPlay}
            onPause={::this.handleOnPause}
            onSeek={::this.handleOnSeek}
            onVolumeChange={::this.handleOnVolumeChange}
            hideControls={!isLeader}
            {...props}
          />

          { ! isLeader ?
            <button className="btn btn-primary" onClick={() => dispatch(becomeLeader())}>Become Leader</button>
            : null }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    channel: state.channel
  };
}

export default connect(mapStateToProps)(ReactTimeout(Channel));
