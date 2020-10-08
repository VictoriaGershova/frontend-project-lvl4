import React from 'react';
import ChannelsList from './ChannelsList';
import MessageBox from './MessageBox';

const Chat = () => (
  <div className="row h-100 pb-3">
    <ChannelsList />
    <MessageBox />
  </div>
);

export default Chat;
