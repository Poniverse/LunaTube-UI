import * as React from 'react';
import * as ReactTimeout from 'react-timeout';
import { OriginalNativeVideoPlayer } from './NativeVideoPlayer';
// import * as path from 'path';

class NativeAudioPlayer extends OriginalNativeVideoPlayer {
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

const Player = ReactTimeout(NativeAudioPlayer);

export { Player as NativeAudioPlayer };
