import React from 'react';
import { connect } from 'react-redux';
import NewMessageForm from './NewMessageForm';

const mapStateToProps = (state) => {
  const {
    messages: { byId, allIds },
  } = state;

  return {
    messages: allIds.map((id) => byId[id]),
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
  const {
    messages,
  } = props;
  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <div id="messages-box" className="chat-messages overflow-auto mb-3">
          {messages.map(({ author, text, id }) => <Message key={id} author={author} text={text} />)}
        </div>
        <div className="mt-auto">
          <NewMessageForm />
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(MessageBox);
