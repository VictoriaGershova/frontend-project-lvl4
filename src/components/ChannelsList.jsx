import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import ChannelModal from './modals/ModalRoot';
import { showModal } from '../slices/modal';
import { getChannels } from '../slices/selectors';
import { setCurrentChannelId } from '../slices/channels';
import Channel from './Channel';

const ChannelsList = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => getChannels(state));
  const showChannelModal = (type, channelId = null) => dispatch(
    showModal({ type, props: { channelId } }),
  );
  return (
    <Col xs={3} className="border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <Button
          variant="link"
          className="ml-auto p-0"
          onClick={() => showChannelModal('ADD_CHANNEL')}
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
      <Nav fill as="ul" variant="pills" className="flex-column">
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            handleSwitch={() => dispatch(setCurrentChannelId({ id: channel.id }))}
            handleRemove={() => showChannelModal('REMOVE_CHANNEL', channel.id)}
            handleRename={() => showChannelModal('RENAME_CHANNEL', channel.id)}
          />
        ))}
      </Nav>
      <ChannelModal />
    </Col>
  );
};

export default ChannelsList;
