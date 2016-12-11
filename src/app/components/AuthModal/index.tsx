import * as React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface IProps {
  show: boolean;
  onClose: Function;
  onAuthComplete: Function;
}

class AuthModal extends React.Component<IProps, any> {
  public componentWillMount() {
    if (process.env.BROWSER) {
      window.addEventListener('message', this.handleWindowMessage.bind(this));
    }
  }

  public render() {
    const { show, onClose } = this.props;

    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Poniverse Auth</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            src="/auth/redirect"
            width="100%"
            height="600px"
            frameBorder="0"
            scrolling="no"
            className="poniverse-iframe"
            />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  public handleWindowMessage(event) {
    const { onAuthComplete } = this.props;

    // For Chrome, the origin property is in the event.originalEvent object.
    const origin = event.origin || event.originalEvent.origin;
    const currentOrigin = window.location.protocol + '//'
      + window.location.hostname
      + (window.location.port ? ':' + window.location.port : '');

    if (origin !== currentOrigin) {
      return;
    }

    if (!event.data.user) {
      return;
    }

    onAuthComplete(event.data);
  }
}

export { AuthModal }
