/* eslint no-param-reassign: 0 */
import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import * as api from '../api';
import { removeChannel, getCurrentChannel } from './channels';

export const fetchMessages = createAsyncThunk(
  'messages/fetchingStatus',
  async ({ channelId }) => {
    const res = await api.fetchMessagesByChannelId(channelId);
    const messages = res.data.data.map(({ attributes }) => attributes);
    return { messages };
  },
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    byId: {},
    allIds: [],
    fetchingState: 'none',
  },
  reducers: {
    addMessage: (state, { payload: { message } }) => {
      state.byId[message.id] = message;
      state.allIds.push(message.id);
    },
  },
  extraReducers: {
    [fetchMessages.pending]: (state) => {
      state.fetchingState = 'requested';
      state.error = null;
    },
    [fetchMessages.fulfilled]: (state, { payload: { messages } }) => {
      state.byId = { ...state.byId, ..._.keyBy(messages, 'id') };
      state.allIds.push(...messages.map(({ id }) => id));
      state.fetchingState = 'finished';
    },
    [fetchMessages.rejected]: (state) => {
      state.fetchingState = 'failed';
      state.error = 'Network problems. Try again!';
    },
    [removeChannel]: (state, { payload: { id: channelId } }) => {
      const { byId, allIds } = state;
      const targetMessagesIds = allIds.filter((id) => byId[id].channelId === channelId);
      state.allIds = allIds.filter((id) => byId[id].channelId !== channelId);
      state.byId = _.omit(byId, targetMessagesIds);
    },
  },
});

export const getCurrentMessages = createSelector(
  [
    (state) => getCurrentChannel(state),
    (state) => state.messages.allIds,
    (state) => state.messages.byId,
  ],
  (currentChannel, allIds, byId) => allIds
    .filter((id) => byId[id].channelId === currentChannel.id)
    .map((id) => byId[id]),
);

export const getFetchingState = createSelector(
  (state) => state.messages.fetchingState,
  (fetchingState) => fetchingState,
);

export default messagesSlice.reducer;

export const { addMessage } = messagesSlice.actions;
