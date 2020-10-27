import _ from 'lodash';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import faker from 'faker';
import Cookies from 'js-cookie';
import { configureStore } from '@reduxjs/toolkit';
import Chat from './components/Chat';
import reducer from './slices';
import * as channelsActions from './slices/channels';
import * as messagesActions from './slices/messages';
import UserContext from './userContext';

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
/* eslint-enable */

const initSocket = (store) => {
  const socket = io();
  socket.on('newMessage', (data) => {
    const { data: { attributes: message } } = data;
    store.dispatch(messagesActions.add({ message }));
  });
  socket.on('newChannel', (data) => {
    const { data: { attributes: channel } } = data;
    store.dispatch(channelsActions.add({ channel }));
  });
  socket.on('removeChannel', (data) => {
    const { data: { id } } = data;
    store.dispatch(channelsActions.remove({ id }));
  });
  socket.on('renameChannel', (data) => {
    const { data: { attributes: channel } } = data;
    store.dispatch(channelsActions.rename({ channel }));
  });
};

const login = () => {
  if (!Cookies.get('userName')) {
    Cookies.set('userName', faker.internet.userName());
  }
  return Cookies.get('userName');
};

const loadMessages = (store, channels) => channels.map(
  (c) => store.dispatch(messagesActions.fetchMessages(c)),
);

const initFontAwesome = () => {
  const script = document.createElement('script');
  script.src = 'https://kit.fontawesome.com/b96dd7d146.js';
  script.crossorigin = 'anonymous';
  document.head.appendChild(script);
};

export default async (gon) => {
  const {
    channels,
    currentChannelId,
  } = gon;

  const preloadedState = {
    channels: {
      byId: _.keyBy(channels, 'id'),
      allIds: channels.map(({ id }) => id),
      currentChannelId,
    },
  };

  const store = configureStore({
    reducer,
    preloadedState,
    devTools: devtoolMiddleware,
  });

  loadMessages(store, channels);

  initSocket(store);

  initFontAwesome();

  render(
    <Provider store={store}>
      <UserContext.Provider value={{ userName: login() }}>
        <Chat />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
