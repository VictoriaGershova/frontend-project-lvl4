/* eslint no-shadow: 0 */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Nav, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import getModal from './modals';
import { getChannels } from '../slices/selectors';
import { setCurrentChannel } from '../slices/channels';
import Channel from './Channel';

const mapStateToProps = (state) => ({ channels: getChannels(state) });

const renderChannelModal = (modal, hideModal) => {
  if (!modal.type) {
    return null;
  }
  const ChannelModal = getModal(modal.type);
  return <ChannelModal onHide={hideModal} channel={modal.channel} />;
};

const ChannelsList = ({ channels, setCurrentChannel }) => {
  const [modal, setModal] = useState({ type: null, channel: null });
  const hideModal = () => setModal({ type: null, channel: null });
  const showModal = (type, channel = null) => setModal({ type, channel });

  return (
    <Col xs={3} className="border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <Button
          variant="link"
          className="ml-auto p-0"
          onClick={() => showModal('adding')}
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
      <Nav fill as="ul" variant="pills" className="flex-column">
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            handleSwitch={() => setCurrentChannel({ channel })}
            handleRemove={() => showModal('removing', channel)}
            handleRename={() => showModal('renaming', channel)}
          />
        ))}
      </Nav>
      {
        renderChannelModal(modal, hideModal)
      }
    </Col>
  );
};

export default connect(mapStateToProps, { setCurrentChannel })(ChannelsList);
