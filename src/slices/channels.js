/* eslint no-param-reassign: 0 */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import * as api from '../api';

export const createChannel = createAsyncThunk(
  'channels/createStatus',
  async ({ name }) => {
    const res = await api.createChannel({ name });
    return res.data.attributes;
  },
);

export const renameChannel = createAsyncThunk(
  'channels/renameStatus',
  async ({ id, newName }) => {
    const res = await api.updateChannelById(id, { name: newName });
    return res.data.attributes;
  },
);

export const deleteChannel = createAsyncThunk(
  'channels/deleteStatus',
  async (id) => {
    const res = await api.deleteChannelById(id);
    return res.data.id;
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    byId: {},
    allIds: [],
    currentChannelId: null,
    creatingState: 'none',
    renamingState: 'none',
    deletingState: 'none',
  },
  reducers: {
    add: (state, { payload: { channel } }) => {
      const { byId, allIds } = state;
      return {
        ...state,
        byId: { ...byId, [channel.id]: channel },
        allIds: [...allIds, channel.id],
      };
    },
    rename: (state, { payload: { channel } }) => {
      const { byId } = state;
      return {
        ...state,
        byId: { ...byId, [channel.id]: channel },
      };
    },
    remove: (state, { payload: { id: channelId } }) => {
      const { byId, allIds } = state;
      return {
        ...state,
        byId: _.omit(byId, channelId),
        allIds: allIds.filter((id) => id !== channelId),
      };
    },
    updateCurrentChannelId: (state, { payload: { id } }) => ({
      ...state,
      currentChannelId: id,
    }),
  },
  extraReducers: {
    [createChannel.pending]: (state) => ({
      ...state,
      creatingState: 'requested',
    }),
    [createChannel.fulfilled]: (state) => ({
      ...state,
      creatingState: 'finished',
    }),
    [createChannel.rejected]: (state) => ({
      ...state,
      creatingState: 'failed',
    }),
    [renameChannel.pending]: (state) => ({
      ...state,
      renamingState: 'requested',
    }),
    [renameChannel.fulfilled]: (state) => ({
      ...state,
      renamingState: 'finished',
    }),
    [renameChannel.rejected]: (state) => ({
      ...state,
      renamingState: 'failed',
    }),
    [deleteChannel.pending]: (state) => ({
      ...state,
      deletingState: 'requested',
    }),
    [deleteChannel.fulfilled]: (state) => ({
      ...state,
      deletingState: 'finished',
    }),
    [deleteChannel.rejected]: (state) => ({
      ...state,
      deletingState: 'failed',
    }),
  },
});

export const {
  add,
  rename,
  remove,
  updateCurrentChannelId,
} = channelsSlice.actions;

export default channelsSlice.reducer;
