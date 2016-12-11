import * as ReactTimeout from 'react-timeout';
import NativeAudioPlayerOriginal from './NativeAudioPlayer';
import NativeVideoPlayerOriginal from './NativeVideoPlayer';
import YoutubePlayerOriginal from './YoutubePlayer';

const NativeAudioPlayer = ReactTimeout(NativeAudioPlayerOriginal);
const NativeVideoPlayer = ReactTimeout(NativeVideoPlayerOriginal);
const YoutubePlayer = ReactTimeout(YoutubePlayerOriginal);

export {
  NativeAudioPlayer,
  NativeVideoPlayer,
  YoutubePlayer
};
