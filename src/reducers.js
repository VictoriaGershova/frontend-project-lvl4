import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

const channelsFetchingState = handleActions({
  [actions.fetchChannelsRequest]: () => 'requested',
  [actions.fetchChannelsSuccess]: () => 'finished',
  [actions.fetchChannelsFailure]: () => 'failed',
}, 'none');

const channelAddingState = handleActions({
  [actions.addChannelRequest]: () => 'requested',
  [actions.addChannelSuccess]: () => 'finished',
  [actions.addChannelFailure]: () => 'failed',
}, 'none');

const messagesFetchingState = handleActions({
  [actions.fetchMessagesRequest]: () => 'requested',
  [actions.fetchMessagesSuccess]: () => 'finished',
  [actions.fetchMessagesFailure]: () => 'failed',
}, 'none');

const channels = handleActions({
  [actions.fetchChannelsSuccess]: (state, { payload }) => ({
    byId: _.keyBy(payload.channels, 'id'),
    allIds: payload.channels.map(({ id }) => id),
  }),
  [actions.addChannelSuccess]: (state, { payload: { channel } }) => {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [channel.id]: channel },
      allIds: [channel.id, ...allIds],
    };
  },
}, { byId: {}, allIds: [] });

const messageSendingState = handleActions({
  [actions.sendMessageRequest]: () => 'requested',
  [actions.sendMessageSuccess]: () => 'finished',
  [actions.sendMessageFailure]: () => 'failed',
}, 'none');

const messages = handleActions({
  [actions.fetchMessagesSuccess]: (state, { payload }) => ({
    byId: _.keyBy(payload.messages, 'id'),
    allIds: payload.messages.map(({ id }) => id),
  }),
  [actions.addMessageSuccess]: (state, { payload: { message } }) => {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [message.id]: message },
      allIds: [...allIds, message.id],
    };
  },
}, { byId: {}, allIds: [] });

const currentChannelId = handleActions({
  [actions.updateCurrentChannelId]: (state, { payload: { id } }) => id,
}, null);

export default combineReducers({
  channelsFetchingState,
  channelAddingState,
  messagesFetchingState,
  channels,
  messageSendingState,
  messages,
  currentChannelId,
});
