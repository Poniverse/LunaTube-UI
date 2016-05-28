import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import path from 'path';
import AbstractPlayer from './AbstractPlayer';

export const PLAYER_SOURCE_NATIVE = 'native';

class NativePlayer extends AbstractPlayer {
  componentDidMount() {
    this.video = ReactDOM.findDOMNode( this.refs.video );
    this.video.addEventListener("loadedmetadata", ::this.handleOnReady );
  }

  playVideo() {
    this.video.play();
    super.playVideo();
  }

  pauseVideo() {
    this.video.pause();
    super.pauseVideo();
  }

  updateTime(time) {
    super.updateTime(time);
    this.video.currentTime = time;
  }

  getCurrentTime() {
    return new Promise(resolve => {
      resolve(this.video.currentTime);
    });
  }

  getDuration() {
    return new Promise(resolve => {
      resolve(this.video.seekable.end(0));
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
      <video
        ref="video"
        loop="true"
      >
        <source src={url} type={"video/"+ extension}/>
      </video>
    )
  }
}

export default NativePlayer;
