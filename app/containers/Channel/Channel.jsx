import React, { Component } from 'react';
import ReactTimeout from 'react-timeout';
import { connect } from 'react-redux';
import Player, { PLAYER_SOURCE_YOUTUBE, PLAYER_SOURCE_NATIVE } from '../../components/Player/Player';
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
            source={PLAYER_SOURCE_NATIVE}
            url="http://www.w3schools.com/html/mov_bbb.mp4"
            onPlay={::this.handleOnPlay}
            onPause={::this.handleOnPause}
            isPlaying={isPlaying}
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
