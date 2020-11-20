import React from 'react';
import { Row } from 'react-bootstrap';
import ChannelsList from './ChannelsList';
import Messenger from './Messenger';

const Chat = () => (
  <Row className="h-100 pb-3">
    <ChannelsList />
    <Messenger />
  </Row>
);

export default Chat;
