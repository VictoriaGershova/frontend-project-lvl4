/* eslint no-shadow: 0 */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import getModal from './modals';
import {
  getChannels,
  setCurrentChannel,
} from '../slices/channels';
import Channel from './Channel';

const mapStateToProps = (state) => {
  const channels = getChannels(state);
  return { channels };
};

const renderChannelModal = (modal, hideModal) => {
  if (!modal.type) {
    return null;
  }
  const ChannelModal = getModal(modal.type);
  return (
    <ChannelModal
      onHide={hideModal}
      channel={modal.channel}
    />
  );
};

const ChannelsList = (props) => {
  const {
    channels,
    setCurrentChannel,
  } = props;

  const [modal, setModal] = useState({ type: null, channel: null });
  const hideModal = () => setModal({ type: null, channel: null });
  const showModal = (type, channel = null) => setModal({ type, channel });

  const makeChannelHandlers = (channel) => ({
    switch: () => setCurrentChannel({ channel }),
    remove: () => showModal('removing', channel),
    rename: () => showModal('renaming', channel),
  });

  return (
    <div className="col-3 border-right">
      <div className="d-flex p-2">
        <span>Channels</span>
        <button
          type="button"
          className="ml-auto p-0 btn text-primary"
          onClick={() => showModal('adding')}
        >
          <span><i className="fas fa-plus" /></span>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {
          channels.map((channel) => {
            const handlers = makeChannelHandlers(channel);
            return (
              <li key={channel.id} className="nav-item">
                <Channel
                  channel={channel}
                  handleSwitch={handlers.switch}
                  handleRemove={handlers.remove}
                  handleRename={handlers.rename}
                />
              </li>
            );
          })
        }
      </ul>
      {
        renderChannelModal(modal, hideModal)
      }
    </div>
  );
};

export default connect(mapStateToProps, { setCurrentChannel })(ChannelsList);
