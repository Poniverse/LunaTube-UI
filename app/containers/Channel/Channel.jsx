import React, { Component } from 'react';
import ReactTimeout from 'react-timeout';
import { connect } from 'react-redux';
import MediaPlayer  from '../../components/MediaPlayer/MediaPlayer';
import { PLAYER_SOURCE_YOUTUBE }  from '../../components/MediaPlayer/Players/YoutubePlayer';
import { PLAYER_SOURCE_NATIVE }  from '../../components/MediaPlayer/Players/NativePlayer';
import { PLAYER_STATE_LOADING, PLAYER_STATE_PAUSED, PLAYER_STATE_PLAYING } from '../../components/MediaPlayer/Players/AbstractPlayer';
import { becomeLeader, subscribeMessage, addTimer, clearTimer, play, pause, seekTo } from '../../redux/channel';

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

  render() {
    const { dispatch, channel: { currentTime, isLeader, leaderTimerId, isPlaying } } = this.props;

    let props = {};

    // Youtube:
    //  - 0elg9WVytMs (Doin it Right - Sim Gretina)
    //  - JHGkaShoyNs (Greg Young - CQRS and Event Sourcing - Code on the Beach 2014) (Hour long video)
    // MP4:
    //  - http://www.w3schools.com/html/mov_bbb.mp4 - 10 second video
    //  - http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4

    return (
      <div className="container">
        <div className="col-xs-12">
          <MediaPlayer
            ref="player"
            state={isPlaying ? PLAYER_STATE_PLAYING : PLAYER_STATE_PAUSED}
            url="Ul49-3cc6Vk"
            source={PLAYER_SOURCE_YOUTUBE}
            currentTime={currentTime}
            onPlay={::this.handleOnPlay}
            onPause={::this.handleOnPause}
            onSeek={::this.handleOnSeek}
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
