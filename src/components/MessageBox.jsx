import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentMessages } from '../slices/selectors';

const MessageBox = () => {
  const messages = useSelector((state) => getCurrentMessages(state));
  const messagesAmount = messages.length;

  const endOfMessageBoxRef = useCallback((endOfMessageBoxEl) => {
    if (endOfMessageBoxEl !== null && !!endOfMessageBoxEl) {
      endOfMessageBoxEl.scrollIntoView();
    }
  }, [messagesAmount]);

  return (
    <div className="overflow-auto mb-3">
      {messages.map(({ id, author, text }, ind) => (
        <div
          key={id}
          ref={ind === messagesAmount - 1 ? endOfMessageBoxRef : undefined}
        >
          <b>{author}</b>
          {`: ${text}`}
        </div>
      ))}
    </div>
  );
};

export default MessageBox;
