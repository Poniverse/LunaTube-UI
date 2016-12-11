import * as React from 'react';
import NativeVideoPlayer from './NativeVideoPlayer';
// import * as path from 'path';

class NativeAudioPlayer extends NativeVideoPlayer {
  public render() {
    const { url } = this.props;
    // const extension = path.extname(url).substr(1);

    return (
      <audio
        ref={this.setPlayer.bind(this)}
      >
        <source src={url} type={'audio/mpeg'}/>
      </audio>
    );
  }
}

export default NativeAudioPlayer;
