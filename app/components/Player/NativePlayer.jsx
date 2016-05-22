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
        autoPlay={true}
      >
        <source src={url} type={"video/"+ extension}/>
      </video>
    )
  }

  componentDidMount() {
    this.video = ReactDOM.findDOMNode( this.refs.video );

    console.log(this.video);

    // window.$video = $video;
    this.video.addEventListener("loadedmetadata", this._metaDataLoaded );
    // this update interval gap is too big make progressbar not snapy
    // $video.addEventListener("timeupdate", this._timeupdate )
    this.video.addEventListener("progress", this._updateProgress );
  }

  playVideo() {
    this.video.play();
  }

  pauseVideo() {
    this.video.pause();
  }

  _updateProgress() {
    console.log('==> Progress report...', arguments);
  }

  _metaDataLoaded() {
    console.log('==> Metadata Loaded...', arguments);
  }
}

export default NativePlayer;
