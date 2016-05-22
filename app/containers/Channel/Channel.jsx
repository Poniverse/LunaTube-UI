import React, { Component } from 'react';
import { connect } from 'react-redux';
import Player, { PLAYER_SOURCE_YOUTUBE, PLAYER_SOURCE_NATIVE } from '../../components/Player/Player';

class Channel extends Component {
  render() {
    // Youtube:
    //  - 0elg9WVytMs (Doin it Right - Sim Gretina)
    // MP4: http://www.w3schools.com/html/mov_bbb.mp4

    // 0elg9WVytMs

    return (
      <div className="container">
        <div className="col-xs-6">
          <Player
            source={PLAYER_SOURCE_YOUTUBE}
            url="0elg9WVytMs"
          />
        </div>
        <div className="col-xs-6">
          <Player
            source={PLAYER_SOURCE_NATIVE}
            url="http://www.w3schools.com/html/mov_bbb.mp4"
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps)(Channel);
