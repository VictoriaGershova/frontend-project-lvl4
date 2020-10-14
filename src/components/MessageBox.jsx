import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { messages: { byId, allIds }, currentChannelId } = state;
  return {
    messages: allIds
      .filter((id) => byId[id].channelId === currentChannelId)
      .map((id) => byId[id]),
  };
};

const Message = ({ author, text }) => (
  <div>
    <b>{author}</b>
    :
    {text}
  </div>
);

const MessageBox = (props) => {
  const { messages } = props;
  return (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      {messages.map(({ id, author, text }) => <Message key={id} author={author} text={text} />)}
    </div>
  );
};

export default connect(mapStateToProps)(MessageBox);
