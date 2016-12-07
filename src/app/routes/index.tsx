import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import { App, Home } from '../containers';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
  </Route>
);
