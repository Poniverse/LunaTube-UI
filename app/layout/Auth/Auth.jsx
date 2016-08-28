import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './Auth.scss';

class Auth extends Component {
  render() {
    const { showModal, onModalClose } = this.props;

    return (
      <Modal show={showModal} onHide={onModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Poniverse Auth</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe src="/auth/redirect" width="100%" height="550px" frameBorder="0" scrolling="no" className="poniverse-iframe"></iframe>
        </Modal.Body>
      </Modal>
    );
  }
}

Auth.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default Auth;
