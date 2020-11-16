// @ts-check
/* eslint react/jsx-filename-extension: 0 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
import io from 'socket.io-client';
import gon from 'gon';
import React from 'react';
import { render } from 'react-dom';
import initApp from './init';
import Chat from './components/Chat';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const socket = io();
const App = initApp(socket, gon);

render(
  <App>
    <Chat />
  </App>,
  document.getElementById('chat'),
);
