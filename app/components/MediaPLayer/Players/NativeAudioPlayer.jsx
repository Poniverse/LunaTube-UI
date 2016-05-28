import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import path from 'path';
import AbstractPlayer from './AbstractPlayer';

export const PLAYER_SOURCE_NATIVE_AUDIO = 'native-audio';

class NativeAudio extends AbstractPlayer {
  componentDidMount() {
    this.player = ReactDOM.findDOMNode( this.refs.player );
    this.player.addEventListener("loadedmetadata", ::this.handleOnReady );
  }

  playVideo() {
    this.player.play();
    super.playVideo();
  }

  pauseVideo() {
    this.player.pause();
    super.pauseVideo();
  }

  updateTime(time) {
    super.updateTime(time);
    this.player.currentTime = time;
  }

  getCurrentTime() {
    return new Promise(resolve => {
      resolve(this.player.currentTime);
    });
  }

  getDuration() {
    return new Promise(resolve => {
      resolve(this.player.seekable.end(0));
    });
  }

  handleOnReady() {
    const { onReady } = this.props;

    this.getDuration().then(time => {
      onReady(time);
    });

    super.handleOnReady(event);
  }

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
