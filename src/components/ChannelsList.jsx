import React, { useState } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actions from '../slices/channels';
import getModal from './ChannelModals';

const mapStateToProps = (state) => {
  const {
    channels: {
      byId,
      allIds,
      currentChannelId,
    },
  } = state;
  const channels = allIds.map((id) => byId[id]);
  return { channels, currentChannelId };
};

const actionCreators = {
  updateCurrentChannelId: actions.updateCurrentChannelId,
  createChannel: actions.createChannel,
  renameChannel: actions.renameChannel,
  deleteChannel: actions.deleteChannel,
};

const renderChannelModal = (modal, hideModal) => {
  if (!modal.type) {
    return null;
  }
  const ChannelModal = getModal(modal.type);
  return (
    <ChannelModal
      onHide={hideModal}
      action={modal.action}
      channel={modal.channel}
    />
  );
};

const DefaultChannel = (props) => {
  const {
    channel: { name: channelName },
    isActive,
    handlers: { handleSwitch },
  } = props;
  const btnColorClass = cn({
    'btn-primary': isActive,
    'btn-light': !isActive,
  });
  return (
    <button
      type="button"
      className={`mb-2 nav-link btn-block text-left btn ${btnColorClass}`}
      onClick={handleSwitch}
    >
      {channelName}
    </button>
  );
};

const UserChannel = (props) => {
  const {
    channel: { name: channelName },
    isActive,
    handlers: {
      handleSwitch,
      handleRename,
      handleRemove,
    },
  } = props;
  const btnColorClass = cn({
    'btn-primary': isActive,
    'btn-light': !isActive,
  });
  return (
    <div className="d-flex mb-2 dropdown btn-group">
      <button
        type="button"
        className={`flex-grow-1 nav-link btn-block text-left btn ${btnColorClass}`}
        onClick={handleSwitch}
      >
        {channelName}
      </button>
      <button
        id="channelMenu"
        type="button"
        className={`flex-grow-0 dropdown-toggle dropdown-toggle-split btn border-left ${btnColorClass}`}
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span className="sr-only">Toggle Dropdown</span>
      </button>
      <div className="dropdown-menu" aria-labelledby="channelMenu">
        <button type="button" className="dropdown-item" onClick={handleRename}>Rename</button>
        <button type="button" className="dropdown-item" onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
};

const ChannelsList = (props) => {
  const {
    channels,
    currentChannelId,
    updateCurrentChannelId,
    createChannel,
    renameChannel,
    deleteChannel,
  } = props;

  const [modal, setModal] = useState({ type: null, channel: null, action: null });
  const hideModal = () => setModal({ type: null, channel: null, action: null });
  const showModal = (type, action, channel = null) => setModal({ type, channel, action });

  const getChannelHandlers = (channel) => ({
    handleSwitch: () => updateCurrentChannelId({ id: channel.id }),
    handleRemove: () => showModal('removing', () => deleteChannel(channel.id), channel),
    handleRename: () => showModal('renaming', (newName) => renameChannel({ id: channel.id, newName }), channel),
  });

  return (
    <>
      <div className="d-flex p-2">
        <span>Channels</span>
        <button
          type="button"
          className="ml-auto p-0 btn text-primary"
          onClick={() => showModal('adding', createChannel)}
        >
          <span><i className="fas fa-plus" /></span>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {
          channels.map((channel) => {
            const Channel = channel.removable ? UserChannel : DefaultChannel;
            return (
              <li key={channel.id} className="nav-item">
                <Channel
                  channel={channel}
                  isActive={channel.id === currentChannelId}
                  handlers={getChannelHandlers(channel)}
                />
              </li>
            );
          })
        }
      </ul>
      {renderChannelModal(modal, hideModal)}
    </>
  );
};

export default connect(mapStateToProps, actionCreators)(ChannelsList);
