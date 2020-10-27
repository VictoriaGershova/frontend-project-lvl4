/* eslint no-param-reassign: 0 */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import * as api from '../api';
import { remove as removeChannel } from './channels';

export const fetchMessages = createAsyncThunk(
  'messages/fetchingStatus',
  async ({ id: channelId }) => {
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
    add: (state, { payload: { message } }) => {
      const { byId, allIds } = state;
      return {
        ...state,
        byId: { ...byId, [message.id]: message },
        allIds: [...allIds, message.id],
      };
    },
  },
  extraReducers: {
    [fetchMessages.pending]: (state) => ({
      ...state,
      fetchingState: 'requested',
    }),
    [fetchMessages.fulfilled]: (state, { payload }) => {
      const { byId, allIds } = state;
      return {
        ...state,
        fetchingState: 'finished',
        byId: { ...byId, ..._.keyBy(payload.messages, 'id') },
        allIds: [...allIds, ...payload.messages.map(({ id }) => id)],
      };
    },
    [fetchMessages.rejected]: (state) => ({
      ...state,
      fetchingState: 'failed',
    }),
    [removeChannel]: (state, { payload: { id: channelId } }) => {
      const { byId, allIds } = state;
      const targetMessagesIds = allIds.filter((id) => byId[id].channelId === channelId);
      return {
        ...state,
        byId: _.omit(byId, targetMessagesIds),
        allIds: allIds.filter((id) => byId[id].channelId !== channelId),
      };
    },
  },
});

export default messagesSlice.reducer;

export const { add } = messagesSlice.actions;
