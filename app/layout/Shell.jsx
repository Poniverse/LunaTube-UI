import React, { Component, PropTypes } from 'react';
import '../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';

/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 *
 * A better explanation of react-router is available here:
 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
 */
const Shell = ({children}) => {
  return (
    <div className="shell">
      {children}
    </div>
  );
};

Shell.propTypes = {
  children: PropTypes.object
};

export default Shell;
