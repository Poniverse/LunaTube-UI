import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import path from 'path';

class NativePlayer extends Component {
  render() {
    const { url } = this.props;
    const extension = path.extname(url).substr(1);

    return (
      <video
        ref="video"
      >
        <source src={url} type={"video/"+ extension}/>
      </video>
    )
  }

  componentDidMount() {
    this.video = ReactDOM.findDOMNode( this.refs.video );

    // window.$video = $video;
    this.video.addEventListener("loadedmetadata", ::this._metaDataLoaded );
    // this update interval gap is too big make progressbar not snappy
    // $video.addEventListener("timeupdate", this._timeupdate )
    this.video.addEventListener("progress", ::this._updateProgress );
  }

  playVideo() {
    this.video.play();
  }

  pauseVideo() {
    this.video.pause();
  }

  getCurrentTime() {
    return new Promise(resolve => {
      resolve(this.video.played.end(0));
    });
  }

  getDuration() {
    return new Promise(resolve => {
      resolve(this.video.seekable.end(0));
    });
  }

  _updateProgress() {
    console.log('==> Progress report...', arguments);
  }

  _metaDataLoaded() {
    const { onReady } = this.props;

    this.getDuration().then(time => {
      onReady(time);
    });

    console.log('==> Metadata Loaded...', arguments);
  }
}

export default NativePlayer;
