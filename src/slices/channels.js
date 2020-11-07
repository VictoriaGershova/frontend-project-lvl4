/* eslint no-param-reassign: 0 */
import { createSlice, createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    byId: {},
    allIds: [],
    currentChannelId: null,
  },
  reducers: {
    addChannel: (state, { payload: { channel } }) => {
      state.byId[channel.id] = channel;
      state.allIds.push(channel.id);
    },
    renameChannel: (state, { payload: { channel } }) => {
      state.byId[channel.id] = channel;
    },
    removeChannel: (state, { payload: { id: channelId } }) => {
      const { byId, allIds, currentChannelId } = state;
      const newCurrentChannelId = channelId === currentChannelId ? allIds[0] : currentChannelId;
      state.byId = _.omit(byId, channelId);
      state.allIds = allIds.filter((id) => id !== channelId);
      state.currentChannelId = newCurrentChannelId;
    },
    setCurrentChannel: (state, { payload: { channel } }) => {
      state.currentChannelId = channel.id;
    },
  },
});

export const getCurrentChannel = createSelector(
  [
    (state) => state.channels.currentChannelId,
    (state) => state.channels.byId,
  ],
  (currentChannelId, channelsById) => channelsById[currentChannelId],
);

export const getChannels = createSelector(
  [
    (state) => getCurrentChannel(state),
    (state) => state.channels.allIds,
    (state) => state.channels.byId,
  ],
  (currentChannel, allIds, byId) => allIds.map((id) => (
    {
      ...byId[id],
      isActive: id === currentChannel.id,
    })),
);

export const {
  addChannel,
  renameChannel,
  removeChannel,
  setCurrentChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
