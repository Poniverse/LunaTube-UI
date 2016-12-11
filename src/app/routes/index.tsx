import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import { App, Home, Room } from '../containers';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/room/:id" component={Room} />
  </Route>
);
