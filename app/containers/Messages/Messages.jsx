import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessage, subscribeMessage } from '../../redux/message';

class Messages extends Component {
  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(subscribeMessage());
  }

  handleFormSubmit(event) {
    event.preventDefault();

    const { dispatch } = this.props;

    dispatch(sendMessage(this.refs.message.value));

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

function mapStateToProps(state) {
  return {
    messages: state.messages
  };
}

export default connect(mapStateToProps)(Messages);
