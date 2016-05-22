import React, { Component } from 'react';
import { connect } from 'react-redux';
import Video, { VIDEO_SOURCE_YOUTUBE } from '../../components/Video/Video';

class Channel extends Component {
  render() {
    // Youtube:
    //  - 0elg9WVytMs (Doin it Right - Sim Gretina)
    // MP4: http://www.w3schools.com/html/mov_bbb.mp4

    // 0elg9WVytMs

    return (
      <div>
        <Video
          source={VIDEO_SOURCE_YOUTUBE}
          url="YcGPSnswzjc">
        </Video>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps)(Channel);
