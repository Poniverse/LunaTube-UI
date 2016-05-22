import React, { Component } from 'react';
import ReactTimeout from 'react-timeout';
import { connect } from 'react-redux';
import Player  from '../../components/Player/Player';
import { PLAYER_SOURCE_YOUTUBE }  from '../../components/Player/YoutubePlayer';
import { PLAYER_SOURCE_NATIVE }  from '../../components/Player/NativePlayer';
import { PLAYER_STATE_LOADING, PLAYER_STATE_PAUSED, PLAYER_STATE_PLAYING } from '../../components/Player/AbstractPlayer';
import { becomeLeader, subscribeMessage, addTimer, clearTimer, play, pause } from '../../redux/channel';

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

  render() {
    const { dispatch, channel: { currentTime, isLeader, leaderTimerId, isPlaying } } = this.props;

    let props = {};

    if (isLeader) {
      console.log(this.refs.player);
    } else {
      props.currentTime = currentTime;
    }

    // Youtube:
    //  - 0elg9WVytMs (Doin it Right - Sim Gretina)
    //  - JHGkaShoyNs (Greg Young - CQRS and Event Sourcing - Code on the Beach 2014) (Hour long video)
    // MP4:
    //  - http://www.w3schools.com/html/mov_bbb.mp4
    //  - http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_50mb.mp4

    // 0elg9WVytMs

    return (
      <div className="container">
        <div className="col-xs-12">
          <Player
            ref="player"
            state={isPlaying ? PLAYER_STATE_PLAYING : PLAYER_STATE_PAUSED}
            url="http://www.w3schools.com/html/mov_bbb.mp4"
            source={PLAYER_SOURCE_NATIVE}
            onPlay={::this.handleOnPlay}
            onPause={::this.handleOnPause}
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
