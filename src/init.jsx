import React from 'react';
import './rollbar';
import faker from 'faker';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './slices/rootReducer';
import { addChannel, renameChannel, removeChannel } from './slices/channels';
import { addMessage } from './slices/messages';
import UserContext from './components/userContext';

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
/* eslint-enable */

const getUserName = () => {
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

const initApp = (gon, socket = io()) => {
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

  const App = ({ children }) => (
    <Provider store={store}>
      <UserContext.Provider value={{ userName: getUserName() }}>
        {children}
      </UserContext.Provider>
    </Provider>
  );

  return App;
};

export default initApp;
