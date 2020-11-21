import { createSelector } from '@reduxjs/toolkit';

export const getCurrentChannelId = (state) => state.channels.currentChannelId;

export const getCurrentMessages = createSelector(
  [
    (state) => getCurrentChannelId(state),
    (state) => state.messages.items,
  ],
  (currentChannelId, messages) => messages
    .filter(({ channelId }) => channelId === currentChannelId),
);

export const getChannels = createSelector(
  [
    (state) => getCurrentChannelId(state),
    (state) => state.channels.items,
  ],
  (currentChannelId, channels) => channels.map((channel) => (
    {
      ...channel,
      isActive: channel.id === currentChannelId,
    })),
);

export const getChannelById = (state, channelId) => getChannels(state)
  .find(({ id }) => id === channelId);
