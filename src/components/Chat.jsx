import React from 'react';
import ChannelsList from './ChannelsList';
import MessageBox from './MessageBox';
import NewMessageForm from './NewMessageForm';

const Chat = () => (
  <div className="row h-100 pb-3">
    <ChannelsList />
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <MessageBox />
        <div className="mt-auto">
          <NewMessageForm />
        </div>
      </div>
    </div>
  </div>
);

export default Chat;
