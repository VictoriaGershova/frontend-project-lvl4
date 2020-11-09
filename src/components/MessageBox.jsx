import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { getCurrentMessages } from '../slices/messages';

const mapStateToProps = (state) => {
  const messages = getCurrentMessages(state);
  const messagesAmount = messages.length;
  return { messages, messagesAmount };
};

const MessageBox = (props) => {
  const { messages, messagesAmount } = props;

  const endOfMessageBoxRef = useCallback((endOfMessageBoxEl) => {
    if (endOfMessageBoxEl !== null && !!endOfMessageBoxEl) {
      endOfMessageBoxEl.scrollIntoView();
    }
  }, [messagesAmount]);

  return (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      {messages.map(({ id, author, text }, ind) => (
        <div
          key={id}
          ref={ind === messagesAmount - 1 ? endOfMessageBoxRef : undefined}
        >
          <b>{author}</b>
          :
          {text}
        </div>
      ))}
    </div>
  );
};

export default connect(mapStateToProps)(MessageBox);
