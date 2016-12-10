import * as React from 'react';
import Youtube from 'react-youtube';
import * as ReactTimeout from 'react-timeout';
import { AbstractPlayer } from './AbstractPlayer';

class YoutubePlayer extends AbstractPlayer {
  protected player: any;

  protected playVideo() {
    this.player.playVideo();
  }

  protected pauseVideo() {
    this.player.pauseVideo();
  }

  protected syncTime(time: number) {
    this.player.seekTo(time);
  }

  protected setVolume(volume: number) {
    this.player.setVolume(volume);
  }

  public getCurrentTime() {
    return this.player.getCurrentTime();
  }

  public getDuration() {
    return this.player.getDuration();
  }

  public handleOnReady(event) {
    const { onReady } = this.props;

    // access to player in all event handlers via event.target
    event.target.pauseVideo();

    this.getDuration().then(time => {
      onReady(time);
    });
  }

  public setYoutubePlayerApi(youtubePlayer) {
    if (this.player) {
      return;
    }

    this.player = youtubePlayer.internalPlayer;
  }

  public render() {
    const { url, onEnd } = this.props;
    const opts = {
      // List of options: https://developers.google.com/youtube/player_parameters
      playerVars: {
        autoplay: 1, // Autoplay video (this is immediately paused, this is done to allow the video to buffer)
        controls: 0, // Hide controls
        iv_load_policy: 3, // Disable annotations
        showinfo: 0, // Disable info headerbar
        disablekb: 0, // Disable keyboard shortcuts
        rel: 0, // Disable related videos at end of playback
      },
    };

    return (
      <Youtube
        ref={this.setYoutubePlayerApi.bind(this)}
        videoId={url}
        opts={opts}
        onReady={this.handleOnReady.bind(this)}
        onEnd={onEnd}
        />
    );
  }
}

const Player = ReactTimeout(YoutubePlayer);

export { Player as YoutubePlayer };
