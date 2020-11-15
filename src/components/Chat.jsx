import React from 'react';
import {
  Row,
  Col,
} from 'react-bootstrap';
import ChannelsList from './ChannelsList';
import MessageBox from './MessageBox';
import NewMessageForm from './NewMessageForm';

const Chat = () => (
  <Row className="h-100 pb-3">
    <ChannelsList />
    <Col className="h-100">
      <div className="d-flex flex-column h-100">
        <MessageBox />
        <div className="mt-auto">
          <NewMessageForm />
        </div>
      </div>
    </Col>
  </Row>
);

export default Chat;
