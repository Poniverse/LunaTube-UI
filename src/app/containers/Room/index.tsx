import * as React from 'react';
import { IRoom, IRoomAction } from '../../models/room';
import { bindActionCreators } from 'redux';
const { connect } = require('react-redux');
import { play, pause, seekTime, setVolume, setVideo, sendMessage, joinRoom }  from '../../redux/modules/room';
import { MediaPlayer, Chat } from '../../components';

interface IProps {
  params: {
    id: string;
  };
  room: IRoom;
  play: Redux.ActionCreator<IRoomAction>;
  pause: Redux.ActionCreator<IRoomAction>;
  seekTime: Redux.ActionCreator<IRoomAction>;
  setVolume: Redux.ActionCreator<IRoomAction>;
  setVideo: Redux.ActionCreator<IRoomAction>;
  sendMessage: Redux.ActionCreator<any>;
  joinRoom: Redux.ActionCreator<any>;
}

@connect(
  state => ({ room: state.room }),
  dispatch => bindActionCreators({
    play,
    pause,
    seekTime,
    setVolume,
    setVideo,
    sendMessage,
    joinRoom,
  }, dispatch)
)
class Room extends React.Component<IProps, any> {
  public componentWillMount() {
    if (! process.env.BROWSER) {
      return;
    }

    const { joinRoom, room, params: { id } } = this.props;
    // Load room info and connect to room channel

    if (room.id !== id) {
      joinRoom(id);
    }
  }

  public render() {
    return (
      <div className="container">
        {this.renderPlayer()}
        {this.renderChat()}
      </div>
    );
  }

  protected renderPlayer() {
    const { room, play, pause, seekTime, setVolume } = this.props;

    if (!room.video) {
      return null;
    }

    return (
      <MediaPlayer
        state={room.state}
        url={room.video.url}
        source={room.video.source}
        syncTime={room.syncTime}
        duration={room.video.duration}
        volume={room.volume}
        onPlay={play}
        onPause={pause}
        onSeek={seekTime}
        onVolumeChange={setVolume}
        onReady={this.handleOnReady.bind(this)}
        onEnd={this.handleOnEnd.bind(this)}
        hideControls={true}
      />
    );
  }

  protected renderChat() {
    const { room: { messages }, sendMessage} = this.props;

    return (
      <Chat
        messages={messages}
        onSendMessage={sendMessage}
      />
    );
  }

  public handleOnReady() {
    const { play, room } = this.props;

    if (room.remoteState === 'playing') {
      play();
    }
  }

  public handleOnEnd() {
    const { pause } = this.props;

    pause();
  }
}

export { Room }
