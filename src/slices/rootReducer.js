import { combineReducers } from '@reduxjs/toolkit';
import channelsReducer from './channels';
import messagesReducer from './messages';
import modalReducer from './modal';

export default combineReducers({
  messages: messagesReducer,
  channels: channelsReducer,
  modal: modalReducer,
});
