import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import '../style/vendor.scss';
import './Shell.scss';

/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 *
 * A better explanation of react-router is available here:
 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
 */
const Shell = ({children, user}) => {
  return (
    <div className="shell">
      <Header user={user} />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

Shell.propTypes = {
  children: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Shell);
