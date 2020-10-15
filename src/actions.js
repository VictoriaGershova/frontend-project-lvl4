import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from './routes';

export const fetchMessagesRequest = createAction('MESSAGES_FETCH_REQUEST');
export const fetchMessagesSuccess = createAction('MESSAGES_FETCH_SUCCESS');
export const fetchMessagesFailure = createAction('MESSAGES_FETCH_FAILURE');

export const fetchMessages = ({ id: channelId }) => async (dispatch) => {
  dispatch(fetchMessagesRequest());
  try {
    const url = routes.channelMessagesPath(channelId);
    const res = await axios.get(url);
    const messages = res.data.map(({ attributes }) => attributes);
    dispatch(fetchMessagesSuccess({ messages }));
  } catch (error) {
    dispatch(fetchMessagesFailure(error));
  }
};

export const receiveMessage = createAction('MESSAGES_RECEIVE');

export const createChannelRequest = createAction('CHANNELS_CREATE_REQUEST');
export const createChannelSuccess = createAction('CHANNELS_CREATE_SUCCESS');
export const createChannelFailure = createAction('CHANNELS_CREATE_FAILURE');

export const createChannel = ({ name }) => async (dispatch) => {
  dispatch(createChannelRequest());
  try {
    const url = routes.channelsPath();
    const res = await axios.post(url, { data: { attributes: { name } } });
    dispatch(createChannelSuccess({ channel: res.data.attributes }));
  } catch (error) {
    dispatch(createChannelFailure(error));
  }
};

export const receiveChannel = createAction('CHANNELS_RECEIVE');

export const updateChannelRequest = createAction('CHANNELS_UPDATE_REQUEST');
export const updateChannelSuccess = createAction('CHANNELS_UPDATE_SUCCESS');
export const updateChannelFailure = createAction('CHANNELS_UPDATE_FAILURE');

export const updateChannel = (channelId, newName) => async (dispatch) => {
  dispatch(updateChannelRequest());
  try {
    const url = routes.channelPath(channelId);
    const res = await axios.post(url, { data: { attributes: { name: newName } } });
    dispatch(updateChannelSuccess({ channel: res.data.attributes }));
  } catch (error) {
    dispatch(updateChannelFailure(error));
  }
};

export const renameChannel = createAction('CHANNELS_RENAME');

export const deleteChannelRequest = createAction('CHANNELS_DELETE_REQUEST');
export const deleteChannelSuccess = createAction('CHANNELS_DELETE_SUCCESS');
export const deleteChannelFailure = createAction('CHANNELS_DELETE_FAILURE');

export const deleteChannel = (channelId) => async (dispatch) => {
  dispatch(deleteChannelRequest());
  try {
    const url = routes.channelPath(channelId);
    const res = await axios.delete(url);
    dispatch(deleteChannelSuccess({ channelId: res.data.id }));
  } catch (error) {
    dispatch(deleteChannelFailure({ error }));
  }
};

export const removeChannel = createAction('CHANNELS_REMOVE');

export const updateCurrentChannelId = createAction('CURRENT_CHANNEL_ID_UPDATE');
