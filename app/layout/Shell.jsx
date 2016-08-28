import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Auth from './Auth/Auth';
import '../style/vendor.scss';
import './Shell.scss';
import { startAuth, finishAuth } from '../redux/auth';

/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 *
 * A better explanation of react-router is available here:
 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
 */
// const Shell = ({children}) => {
//   return (
//     <div className="shell">
//       <Header />
//       <main>
//         {children}
//       </main>
//       <Footer />
//     </div>
//   );
// }

class Shell extends Component {
  render() {
    const { children, auth, actions } = this.props;

    return (
      <div className="shell">
        <Header user={auth.user} onLoginClick={() => {
          actions.startAuth();
        }}/>
        <main>
          {children}
        </main>
        <Footer />
        <Auth showModal={auth.showAuthModal}
              onModalClose={actions.finishAuth} />
      </div>
    );
  }

  renderAuthModal() {
    const { auth, actions } = this.props;

    return (
      <Modal show={auth.showAuth} onHide={actions.finishAuth}>
        <Modal.Header closeButton>
          <Modal.Title>Poniverse Auth</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe src="/auth/redirect" width="100%" height="600px" frameBorder="0" scrolling="no" className="poniverse-iframe"></iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
;

Shell.propTypes = {
  children: PropTypes.object,
  auth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({startAuth, finishAuth}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Shell);
