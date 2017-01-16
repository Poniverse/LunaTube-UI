import * as React from 'react';
const styles = require('./styles.css');
const cx = require('classnames/bind').bind(styles);

interface IProps {
  messages: string[];
  onSendMessage: Function;
}

interface IState {

}

class Chat extends React.Component<IProps, IState> {
  protected messageBox: HTMLInputElement;

  protected handleMessageKeyPress({ key }) {
    if (key === 'Enter') {
      this.handleSendMessageClick();
    }
  }

  protected handleSendMessageClick() {
    const messageVal = this.messageBox.value;
    if (messageVal !== '') {
      this.props.onSendMessage(messageVal);
      this.messageBox.value = '';
    }
  }

  protected setMessageBox(messageBox: HTMLInputElement) {
    this.messageBox = messageBox;
  }

  public render() {
    return (
      <div className={cx('chat-container')}>
        <div className={cx('messages-container')}>
          { this.renderMessages() }
        </div>
        <div className="new-message">
          <input type="text" ref={this.setMessageBox.bind(this)} onKeyPress={this.handleMessageKeyPress.bind(this)} />
          <button onClick={this.handleSendMessageClick.bind(this)}>Send</button>
        </div>
      </div>
    );
  }

  protected renderMessages() {
    const { messages } = this.props;

    return messages.map(msg => {
      return (
        <div className={cx('message')}>
          { msg }
        </div>
      );
    });
  }
}

export { Chat }
