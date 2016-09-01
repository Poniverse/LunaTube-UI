import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Auth from './Auth/Auth';
import '../style/vendor.scss';
import './Shell.scss';
import { login, logout } from '../redux/auth';

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

  handleAuthModalClose(event) {
    // const { dispatch } = this.props;
    // dispatch(finishAuth());
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
          authUrl="/auth/redirect"
          showModal={auth.showModal}
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
