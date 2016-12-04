import React, { Component } from 'react';
import path from 'path';
import NativeVideoPlayer from './NativeVideoPlayer';

export const PLAYER_SOURCE_NATIVE_AUDIO = 'native-audio';

class NativeAudio extends NativeVideoPlayer {
  render() {
    const { url } = this.props;
    const extension = path.extname(url).substr(1);

    return (
      <audio
        ref="player"
      >
        <source src={url} type={"audio/mpeg"}/>
      </audio>
    )
  }
}

export default NativeAudio;
