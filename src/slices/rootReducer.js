import { combineReducers } from '@reduxjs/toolkit';
import channelsReducer from './channels';
import messagesReducer from './messages';

export default combineReducers({
  messages: messagesReducer,
  channels: channelsReducer,
});
