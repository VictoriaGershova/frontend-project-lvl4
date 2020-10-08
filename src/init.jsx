import _ from 'lodash';
import axios from 'axios';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import io from 'socket.io-client';
import faker from 'faker';
import Cookies from 'js-cookie';
import reducers from './reducers';
import Chat from './components/Chat';
import routes from './routes';
import * as actions from './actions';
import UserContext from './userContext';

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
/* eslint-enable */

const login = () => {
  if (!Cookies.get('userName')) {
    Cookies.set('userName', faker.internet.userName());
  }
  return Cookies.get('userName');
};

export default async (gon) => {
  const {
    channels,
    currentChannelId,
  } = gon;
  const url = routes.channelMessagesPath(currentChannelId);
  const res = await axios.get(url);
  const messages = res.data.data.map(({ attributes }) => ({ ...attributes }));

  const preloadedState = {
    channels: {
      byId: _.keyBy(channels, 'id'),
      allIds: channels.map(({ id }) => id),
    },
    messages: {
      byId: _.keyBy(messages, 'id'),
      allIds: messages.map(({ id }) => id) || [],
    },
    currentChannelId,
  };

  const store = createStore(
    reducers,
    preloadedState,
    compose(
      applyMiddleware(thunk),
      devtoolMiddleware,
    ),
  );

  const socket = io();
  socket.on('newMessage', (data) => {
    const { data: { attributes: message } } = data;
    store.dispatch(actions.addMessageSuccess({ message }));
  });

  render(
    <Provider store={store}>
      <UserContext.Provider value={{ userName: login() }}>
        <Chat />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
