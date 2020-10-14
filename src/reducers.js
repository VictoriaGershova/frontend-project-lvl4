import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

const messagesFetchingState = handleActions({
  [actions.fetchMessagesRequest]: () => 'requested',
  [actions.fetchMessagesSuccess]: () => 'finished',
  [actions.fetchMessagesFailure]: () => 'failed',
}, 'none');

const messageSendingState = handleActions({
  [actions.sendMessageRequest]: () => 'requested',
  [actions.sendMessageSuccess]: () => 'finished',
  [actions.sendMessageFailure]: () => 'failed',
}, 'none');

const messages = handleActions({
  [actions.fetchMessagesSuccess]: (state, { payload }) => {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, ..._.keyBy(payload.messages, 'id') },
      allIds: [...allIds, payload.messages.map(({ id }) => id)],
    };
  },
  [actions.receiveMessage]: (state, { payload: { message } }) => {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [message.id]: message },
      allIds: [...allIds, message.id],
    };
  },
  [actions.removeChannel]: (state, { payload: { id: channelId } }) => {
    const { byId, allIds } = state;
    const targetMessagesIds = allIds.filter((id) => byId[id].channelId === channelId);
    return {
      byId: _.omit(byId, targetMessagesIds),
      allIds: allIds.filter((id) => byId[id].channelId !== channelId),
    };
  },
}, { byId: {}, allIds: [] });

const channelCreatingState = handleActions({
  [actions.createChannelRequest]: () => 'requested',
  [actions.createChannelSuccess]: () => 'finished',
  [actions.createChannelFailure]: () => 'failed',
}, 'none');

const channelUpdatingState = handleActions({
  [actions.updateChannelRequest]: () => 'requested',
  [actions.updateChannelSuccess]: () => 'finished',
  [actions.updateChannelFailure]: () => 'failed',
}, 'none');

const channelDeletingingState = handleActions({
  [actions.deleteChannelRequest]: () => 'requested',
  [actions.deleteChannelSuccess]: () => 'finished',
  [actions.deleteChannelFailure]: () => 'failed',
}, 'none');

const channels = handleActions({
  [actions.receiveChannel]: (state, { payload: { channel } }) => {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [channel.id]: channel },
      allIds: [channel.id, ...allIds],
    };
  },
  [actions.renameChannel]: (state, { payload: { channel } }) => {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [channel.id]: channel },
      allIds,
    };
  },
  [actions.removeChannel]: (state, { payload: { id: channelId } }) => {
    const { byId, allIds } = state;
    return {
      byId: _.omit(byId, channelId),
      allIds: allIds.filter((id) => id !== channelId),
    };
  },
}, { byId: {}, allIds: [] });

const currentChannelId = handleActions({
  [actions.updateCurrentChannelId]: (state, { payload: { id } }) => id,
}, null);

export default combineReducers({
  messagesFetchingState,
  messageSendingState,
  messages,
  channelCreatingState,
  channelUpdatingState,
  channelDeletingingState,
  channels,
  currentChannelId,
});
