/* eslint no-param-reassign: 0 */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../api';
import { removeChannel } from './channels';

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
    items: [],
  },
  reducers: {
    addMessage: (state, { payload: { message } }) => {
      state.items.push(message);
    },
  },
  extraReducers: {
    [fetchMessages.fulfilled]: (state, { payload: { messages } }) => {
      state.items.push(...messages);
    },
    [removeChannel]: (state, { payload: { id: removedChannelId } }) => {
      state.items = state.items.filter(({ channelId }) => channelId !== removedChannelId)
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
