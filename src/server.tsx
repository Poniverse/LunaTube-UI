require('dotenv-safe').load();

import appConfig from '../config/main';

import * as e6p from 'es6-promise';
(e6p as any).polyfill();
import 'isomorphic-fetch';

import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

import { Provider } from 'react-redux';
import { createMemoryHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
const { ReduxAsyncConnect, loadOnServer } = require('redux-connect');
import { configureStore } from './app/redux/store';
import { setUser } from './app/redux/modules/user';
import routes from './app/routes';
import axios from 'axios';

import { Html } from './app/containers';
const manifest = require('../build/manifest.json');

const express = require('express');
const path = require('path');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const Chalk = require('chalk');
const favicon = require('serve-favicon');

import { storeAuthData, getAuthData } from './app/helpers/AuthHelpers';

axios.defaults.baseURL = appConfig.apiUrl;

const app = express();

app.use(compression());
app.use(cookieParser('auth-secrets'));

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackConfig = require('../config/webpack/dev');
  const webpackCompiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(webpackCompiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
    noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    historyApiFallback: true,
    quiet: true,
  }));

  app.use(require('webpack-hot-middleware')(webpackCompiler));
}

app.use(favicon(path.join(__dirname, '../src/favicon.ico')));

app.use('/public', express.static(path.join(__dirname, '../build/public')));

app.get('/auth/redirect', (req, res) => {

  const queryString = [
    'response_type=code',
    'client_id=' + appConfig.poniverseClientId,
    'redirect_uri=' + appConfig.poniverseRedirectUri,
  ];

  res.redirect('https://poniverse.net/oauth/authorize?' + queryString.join('&'));
});

app.get('/auth/oauth', (req, res) => {
  const data = {
    grant_type: 'authorization_code',
    code: req.query.code,
  };

  if (!data.code) {
    res.status(400).send({error: 'No code provided'});
  }

  axios.post('/auth/poniverse', {
    code: data.code,
  })
    .then(response => {
      const json = JSON.stringify(response.data);

      storeAuthData(res, response.data);

      res.status(200).send(`
<html>
<body>
<script>
  parent.postMessage(${json}, "${appConfig.appUrl}");
</script>
</body>
</html>
`);
    })
    .catch(error => {
      res.status(error.status).send(error.data);
    });
});

app.post('/auth/logout', (req, res) => {
  res.cookie('auth-secrets', '', {maxAge: -1, httpOnly: true});

  res.status(204).send();
});

app.get('*', (req, res) => {
  const location = req.url;
  const memoryHistory = createMemoryHistory(req.originalUrl);
  const store = configureStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);

  const authData = getAuthData(req);

  if (authData) {
    store.dispatch(setUser(authData.user));
  }

  match({ history, routes, location },
    (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        const asyncRenderData = Object.assign({}, renderProps, { store });

        loadOnServer(asyncRenderData).then(() => {
          const markup = ReactDOMServer.renderToString(
            <Provider store={store} key="provider">
              <ReduxAsyncConnect {...renderProps} />
            </Provider>
          );
          res.status(200).send(renderHTML(markup, store));
        });
      } else {
        res.status(404).send('Not Found?');
      }
    });
});

app.listen(appConfig.port, appConfig.host, err => {
  if (err) {
    console.error(Chalk.bgRed(err));
  } else {
    console.info(Chalk.black.bgGreen(
      `\n\n💂  Listening at http://${appConfig.host}:${appConfig.port}\n`
    ));
  }
});

function renderHTML(markup: string, store: any) {
  const html = ReactDOMServer.renderToString(
    <Html markup={markup} manifest={manifest} store={store} />
  );

  return `<!doctype html> ${html}`;
}
