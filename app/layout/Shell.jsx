import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Auth from './Auth/Auth';
import '../style/vendor.scss';
import './Shell.scss';
import { login, logout, cancelLogin } from '../redux/auth';

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
  handleLoginClick(event) {
    this.props.dispatch(login());
  }

  handleLogoutClick() {
    this.props.dispatch(logout());
  }

  handleAuthModalClose() {
    this.props.dispatch(cancelLogin());
  }

  render() {
    const { children, auth } = this.props;

    return (
      <div className="shell">
        <Header user={auth.user}
                isAuthenticating={auth.authenticating}
                onLoginClick={::this.handleLoginClick}
                onLogoutClick={::this.handleLogoutClick}
        />
        <main>
          {children}
        </main>
        <Footer />
        <Auth
          isAuthenticating={auth.authenticating}
          authUrl={`${window.__API_URL__}/auth/post_message`}
          modalAuthUrl={`${window.__API_URL__}/auth`}
          showModal={auth.showModal}
          showErrorModal={auth.showErrorModal}
          onModalClose={::this.handleAuthModalClose} />
      </div>
    );
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

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators({login, finishAuth}, dispatch)
//   };
// }

export default connect(mapStateToProps)(Shell);
