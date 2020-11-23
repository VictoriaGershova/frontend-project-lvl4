import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { animateScroll as scroll } from 'react-scroll';
import { getCurrentMessages } from '../slices/selectors';

const MessageBox = () => {
  const messages = useSelector(getCurrentMessages);
  const messagesAmount = messages.length;

  useEffect(() => {
    scroll.scrollToBottom({
      containerId: 'message-box',
      duration: 0,
    });
  }, [messagesAmount]);

  return (
    <div id="message-box" className="overflow-auto mb-3">
      {messages.map(({ id, author, text }) => (
        <div key={id}>
          <b>{author}</b>
          {`: ${text}`}
        </div>
      ))}
    </div>
  );
};

export default MessageBox;
