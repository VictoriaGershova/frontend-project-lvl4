import { combineReducers } from '@reduxjs/toolkit';
import messages from './messages';
import channels from './channels';

export default combineReducers({
  messages,
  channels,
});
