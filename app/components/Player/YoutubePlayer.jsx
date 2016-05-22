import React, { Component } from 'react';
import Youtube from 'react-youtube';

class YoutubeVideo extends Component {
  render() {
    const { url } = this.props;
    const opts = {
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        controls: 0,
        modestbranding: true,
        iv_load_policy: 3,
        showinfo: 0,
        disablekb: 0,
        rel: 0
      }
    };

    return (
      <Youtube
        ref="youtubePlayer"
        videoId={url}
        opts={ opts }
        onReady={::this.onReady}
      />
    );
  }

  playVideo() {
    this.refs.youtubePlayer._internalPlayer.playVideo();
  }

  pauseVideo() {
    this.refs.youtubePlayer._internalPlayer.pauseVideo();
  }

  onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

export default YoutubeVideo;
