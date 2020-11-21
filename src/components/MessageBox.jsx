import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentMessages } from '../slices/selectors';

const MessageBox = () => {
  const messages = useSelector(getCurrentMessages);
  const messagesAmount = messages.length;

  const lastMessageRef = useRef();
  useEffect(() => {
    if (!lastMessageRef.current) {
      return;
    }
    lastMessageRef.current.scrollIntoView();
  }, [messagesAmount]);

  return (
    <div className="overflow-auto mb-3">
      {messages.map(({ id, author, text }, ind) => (
        <div
          key={id}
          ref={ind === messagesAmount - 1 ? lastMessageRef : undefined}
        >
          <b>{author}</b>
          {`: ${text}`}
        </div>
      ))}
    </div>
  );
};

export default MessageBox;
