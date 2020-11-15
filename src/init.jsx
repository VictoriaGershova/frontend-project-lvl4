import React from 'react';
import './rollbar';
import faker from 'faker';
import Cookies from 'js-cookie';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Chat from './components/Chat';
import reducer from './slices/rootReducer';
import { addChannel, renameChannel, removeChannel } from './slices/channels';
import { addMessage } from './slices/messages';
import UserContext from './components/userContext';

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

const initSocket = (socket, store) => {
  socket.on('newMessage', (data) => {
    const { data: { attributes: message } } = data;
    store.dispatch(addMessage({ message }));
  });
  socket.on('newChannel', (data) => {
    const { data: { attributes: channel } } = data;
    store.dispatch(addChannel({ channel }));
  });
  socket.on('removeChannel', (data) => {
    const { data: { id } } = data;
    store.dispatch(removeChannel({ id }));
  });
  socket.on('renameChannel', (data) => {
    const { data: { attributes: channel } } = data;
    store.dispatch(renameChannel({ channel }));
  });
};

const initFontAwesome = () => {
  const script = document.createElement('script');
  script.src = 'https://kit.fontawesome.com/b96dd7d146.js';
  script.crossorigin = 'anonymous';
  document.head.appendChild(script);
};

export default async (socket, gon) => {
  const preloadedState = {
    channels: {
      items: gon.channels,
      currentChannelId: gon.currentChannelId,
    },
    messages: { items: gon.messages },
  };

  const store = configureStore({
    reducer,
    preloadedState,
    devTools: devtoolMiddleware,
  });

  initSocket(socket, store);

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
