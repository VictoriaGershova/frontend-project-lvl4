/* eslint no-param-reassign: 0 */
import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    items: [],
    currentChannelId: null,
  },
  reducers: {
    addChannel: (state, { payload: { channel } }) => {
      state.items.push(channel);
    },
    renameChannel: (state, { payload: { channel } }) => {
      const targetChannel = state.items.find(({ id }) => id === channel.id);
      targetChannel.name = channel.name;
    },
    removeChannel: (state, { payload: { id: removedChannelId } }) => {
      const { items, currentChannelId } = state;
      if (removedChannelId === currentChannelId) {
        state.currentChannelId = items[0].id;
      }
      state.items = items.filter(({ id }) => id !== removedChannelId);
    },
    setCurrentChannel: (state, { payload: { channel } }) => {
      state.currentChannelId = channel.id;
    },
  },
});

export const {
  addChannel,
  renameChannel,
  removeChannel,
  setCurrentChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
