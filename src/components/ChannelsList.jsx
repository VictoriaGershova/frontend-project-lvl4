import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import ChannelModal from './modals/ModalRoot';
import { showModal } from '../slices/modal';
import { getChannels } from '../slices/selectors';
import Channel from './Channel';

const ChannelsList = () => {
  const dispatch = useDispatch();
  const channels = useSelector(getChannels);
  const showAddChannelModal = () => dispatch(showModal({ type: 'ADD_CHANNEL' }));
  return (
    <Col xs={3} className="border-right mt-1">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <Button
          variant="link"
          className="ml-auto p-0"
          onClick={showAddChannelModal}
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
      <Nav fill as="ul" variant="pills" className="flex-column">
        {channels.map(({ id }) => <Channel key={id} channelId={id} />)}
      </Nav>
      <ChannelModal />
    </Col>
  );
};

export default ChannelsList;
