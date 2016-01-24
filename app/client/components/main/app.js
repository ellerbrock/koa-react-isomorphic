import React from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import Debug from './debug';

export default ({ store, routes }) => (
  <Provider key='provider' store={store}>
    <div>
      <ReduxRouter routes={routes} />
      <Debug />
    </div>
  </Provider>
);
