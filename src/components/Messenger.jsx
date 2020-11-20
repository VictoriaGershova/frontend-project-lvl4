import React from 'react';
import { Col } from 'react-bootstrap';
import MessageBox from './MessageBox';
import NewMessageForm from './NewMessageForm';

const Messenger = () => (
  <Col className="h-100">
    <div className="d-flex flex-column h-100">
      <MessageBox />
      <div className="mt-auto">
        <NewMessageForm />
      </div>
    </div>
  </Col>
);

export default Messenger;
