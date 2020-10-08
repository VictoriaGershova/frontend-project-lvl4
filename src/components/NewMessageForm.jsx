import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import UserContext from '../userContext';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const {
    currentChannelId,
    messageSendingState,
  } = state;
  return {
    currentChannelId,
    messageSendingState,
  };
};

const actionCreators = {
  sendMessage: actions.sendMessage,
};

const NewMessageForm = (props) => {
  const {
    currentChannelId,
    sendMessage,
  } = props;
  return (
    <UserContext.Consumer>
      {({ userName }) => (
        <Formik
          initialValues={{ text: '' }}
          onSubmit={({ text }) => sendMessage(currentChannelId, { text, author: userName })}
        >
          {({ handleSubmit, handleChange, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="input-group">
                  <input
                    name="text"
                    type="text"
                    onChange={handleChange}
                    className="mr-2 form-control"
                    value={values.text}
                  />
                  <button type="submit" className="btn btn-primary">Send</button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      )}
    </UserContext.Consumer>
  );
};

export default connect(mapStateToProps, actionCreators)(NewMessageForm);
