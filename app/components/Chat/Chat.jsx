import React, { Component } from 'react';

class Chat extends Component {
  constructor() {
    super();
  }

  handleFormSubmit(event) {
    const { onSendMessage } = this.props;

    event.preventDefault();

    if (onSendMessage) {
      onSendMessage(this.refs.message.value);
    }

    this.refs.message.value = '';
  }

  render() {
    const { messages } = this.props;
    return (
      <div>
        <ul>
          { messages.map((message, key) => <li key={key}>{message}</li>) }
        </ul>

        <form onSubmit={::this.handleFormSubmit}>
          <input type="text" ref="message" />
          <button>Send Message</button>
        </form>
      </div>
    );
  }
}

export default Chat;
