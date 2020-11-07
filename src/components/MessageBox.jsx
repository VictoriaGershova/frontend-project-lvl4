import React from 'react';
import { connect } from 'react-redux';
import { getCurrentMessages, getFetchingState } from '../slices/messages';
import NewMessageForm from './NewMessageForm';

const mapStateToProps = (state) => {
  const messages = getCurrentMessages(state);
  const fetchingState = getFetchingState(state);
  return { messages, fetchingState };
};

const Message = ({ author, text }) => (
  <div>
    <b>{author}</b>
    :
    {text}
  </div>
);

const MessageBox = (props) => {
  const { messages, fetchingState } = props;
  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <div id="messages-box" className="chat-messages overflow-auto mb-3">
          {messages.map(({ id, author, text }) => (
            <Message key={id} author={author} text={text} />
          ))}
          {fetchingState === 'requested' && (
            <div className="spinner-grow text-secondary" role="status">
              <span className="sr-only">Fetching...</span>
            </div>
          )}
        </div>
        <div className="mt-auto">
          <NewMessageForm />
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(MessageBox);
