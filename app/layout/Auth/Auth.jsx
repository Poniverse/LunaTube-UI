import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './Auth.scss';

class Auth extends Component {
  render() {
    return (
      <div>
        {this.renderModal()}
        {this.renderErrorModal()}
        {this.renderIframe()}
      </div>
    );
  }

  renderModal() {
    const { showModal, modalAuthUrl, onModalClose } = this.props;

    return (
      <Modal show={showModal}
             backdrop="static"
             keyboard={false}
             onHide={onModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Poniverse Auth</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe src={modalAuthUrl} width="100%" height="550px" frameBorder="0" scrolling="no" className="poniverse-iframe"></iframe>
        </Modal.Body>
      </Modal>
    );
  }

  renderErrorModal() {
    const { showErrorModal, onModalClose } = this.props;

    return (
      <Modal show={showErrorModal}
             onHide={onModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Auth Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Unfortunately we are having problems attempting to log you in at the moment. Please try again at a later time.
        </Modal.Body>
      </Modal>
    );
  }

  renderIframe() {
    const { isAuthenticating, authUrl } = this.props;

    if (isAuthenticating) {
      return (
        <iframe src={authUrl} style={{display: 'none'}} />
      );
    }
  }
}

Auth.propTypes = {
  isAuthenticating: PropTypes.bool.isRequired,
  authUrl: PropTypes.string.isRequired,
  modalAuthUrl: PropTypes.string,
  showModal: PropTypes.bool.isRequired,
  showErrorModal: PropTypes.bool,
  onModalClose: PropTypes.func.isRequired,
};

export default Auth;
