import React, { Component } from 'react';
import Youtube from 'react-youtube';

class YoutubePlayer extends Component {
  componentDidMount() {
    this.player = this.refs.youtubePlayer._internalPlayer;
  }

  render() {
    const { url } = this.props;
    const opts = {
      // List of options: https://developers.google.com/youtube/player_parameters
      playerVars: {
        autoplay: 1, // Autoplay video (this is immediately paused, this is done to allow the video to buffer)
        controls: 0, // Hide controls
        iv_load_policy: 3, // Disable annotations
        showinfo: 0, // Disable info headerbar
        disablekb: 0, // Disable keyboard shortcuts
        rel: 0 // Disable related videos at end of playback
      }
    };

    return (
      <Youtube
        ref="youtubePlayer"
        videoId={url}
        opts={ opts }
        onReady={::this.handleOnReady}
      />
    );
  }

  playVideo() {
    this.player.playVideo();
  }

  pauseVideo() {
    this.player.pauseVideo();
  }

    getCurrentTime() {
    return this.player.getCurrentTime();
  }

  getDuration() {
    return this.player.getDuration();
  }

  handleOnReady(event) {
    const { onReady } = this.props;
    
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
    
    this.getDuration().then(time => {
      onReady(time);
    });
  }
}

export default YoutubePlayer;
