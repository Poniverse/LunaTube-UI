import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Shell from './layout/Shell';
import Index from './containers/Index/Index';
import Messages from './containers/Messages/Messages';
import Channel from './containers/Channel/Channel';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  return (
    <Route path="/" component={Shell}>
      <IndexRoute component={Index}  />
      <Route path="/messages" component={Messages} />
      <Route path="/channel" component={Channel} />
    </Route>
  );
};
