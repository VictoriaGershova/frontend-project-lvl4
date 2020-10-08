import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from './routes';

export const fetchChannelsRequest = createAction('CHANNELS_FETCH_REQUEST');
export const fetchChannelsSuccess = createAction('CHANNELS_FETCH_SUCCESS');
export const fetchChannelsFailure = createAction('CHANNELS_FETCH_FAILURE');

export const fetchChannels = () => async (dispatch) => {
  dispatch(fetchChannelsRequest());
  try {
    const url = routes.channelsPath();
    const res = await axios.get(url);
    dispatch(fetchChannelsSuccess({ channels: res.data }));
  } catch (error) {
    dispatch(fetchChannelsFailure({ error }));
  }
};

export const addChannelRequest = createAction('CHANNELS_ADD_REQUEST');
export const addChannelSuccess = createAction('CHANNELS_ADD_SUCCESS');
export const addChannelFailure = createAction('CHANNELS_ADD_FAILURE');

export const addChannel = ({ channel }) => async (dispatch) => {
  dispatch(addChannelRequest());
  try {
    const url = routes.channelPath(channel.id);
    const res = await axios.post(url, { channel });
    dispatch(addChannelSuccess({ channel: res.data }));
  } catch (error) {
    dispatch(addChannelFailure({ error }));
  }
};

export const fetchMessagesRequest = createAction('MESSAGES_FETCH_REQUEST');
export const fetchMessagesSuccess = createAction('MESSAGES_FETCH_SUCCESS');
export const fetchMessagesFailure = createAction('MESSAGES_FETCH_FAILURE');

export const fetchMessages = (channel) => async (dispatch) => {
  dispatch(fetchMessagesRequest());
  try {
    const url = routes.channelMessagesPath(channel.id);
    const res = await axios.get(url);
    dispatch(fetchMessagesSuccess({ messages: res.data }));
  } catch (error) {
    dispatch(fetchMessagesFailure({ error }));
  }
};

export const sendMessageRequest = createAction('MESSAGES_SEND_REQUEST');
export const sendMessageSuccess = createAction('MESSAGES_SEND_SUCCESS');
export const sendMessageFailure = createAction('MESSAGES_SEND_FAILURE');

export const sendMessage = (channelId, message) => async (dispatch) => {
  dispatch(sendMessageRequest());
  try {
    const url = routes.channelMessagesPath(channelId);
    const res = await axios.post(url, { data: { attributes: message } });
    dispatch(sendMessageSuccess({ message: res.data }));
  } catch (err) {
    dispatch(sendMessageFailure(err));
  }
};

export const addMessageRequest = createAction('MESSAGES_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGES_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGES_ADD_FAILURE');

export const addMessage = (channelId, message) => async (dispatch) => {
  dispatch(addMessageRequest());
  try {
    const url = routes.channelMessagesPath(channelId);
    const res = await axios.post(url, { data: { attributes: message } });
    dispatch(addMessageSuccess({ message: res.data }));
  } catch (error) {
    dispatch(addMessageFailure({ error }));
  }
};

export const updateNewMessageText = createAction('NEW_MESSAGE_TEXT_UPDATE');

export const updateCurrentChannelId = createAction('CURRENT_CHANNEL_ID_UPDATE');
