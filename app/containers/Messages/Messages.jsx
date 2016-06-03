import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chat from '../../components/Chat/Chat';
import { sendMessage, subscribeMessage } from '../../redux/message';

class Messages extends Component {
  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(subscribeMessage());
  }

  sendMessageToServer(message) {
    const { dispatch } = this.props;

    dispatch(sendMessage(message));
  }

  render() {
    const { messages } = this.props;

    return (
      <div className="container">
        <div className="col-xs-12">
          <Chat
            messages={messages}
            onSendMessage={::this.sendMessageToServer}
            />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages
  };
}

export default connect(mapStateToProps)(Messages);
