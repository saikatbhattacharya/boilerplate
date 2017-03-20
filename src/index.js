/* eslint "no-undef": 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import App from 'containers/App';
import Body from 'containers/Body';
import configureStore from './stores';

require('react-datagrid/index.css');
require('whatwg-fetch');

const initialStoreState = {};
const store = configureStore(initialStoreState, browserHistory);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App} path="/">
        <IndexRoute component={Body} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app'),
);
