import _ from 'lodash';
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
import * as actions from './actions';
import UserContext from './userContext';

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
/* eslint-enable */

const initSocket = (store) => {
  const socket = io();
  socket.on('newMessage', (data) => {
    const { data: { attributes: message } } = data;
    store.dispatch(actions.receiveMessage({ message }));
  });
  socket.on('newChannel', (data) => {
    const { data: { attributes: channel } } = data;
    store.dispatch(actions.receiveChannel({ channel }));
  });
  socket.on('removeChannel', (data) => {
    const { data: { id } } = data;
    store.dispatch(actions.removeChannel({ id }));
  });
  socket.on('renameChannel', (data) => {
    const { data: { attributes: channel } } = data;
    store.dispatch(actions.renameChannel({ channel }));
  });
};

const login = () => {
  if (!Cookies.get('userName')) {
    Cookies.set('userName', faker.internet.userName());
  }
  return Cookies.get('userName');
};

const loadMessages = (channels) => channels.map(actions.fetchMessages);

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

  loadMessages(channels);

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
