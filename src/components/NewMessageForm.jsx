import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import UserContext from '../userContext';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { currentChannelId, messageSendingState } = state;
  return {
    currentChannelId,
    messageSendingState,
  };
};

const actionCreators = {
  sendMessage: actions.sendMessage,
};

const NewMessageForm = (props) => {
  const { currentChannelId, messageSendingState, sendMessage } = props;
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
                    disabled={messageSendingState === 'requested'}
                    onChange={handleChange}
                    className="mr-2 form-control"
                    value={values.text}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={messageSendingState === 'requested'}
                  >
                    <span>
                      <i className="fas fa-envelope" />
                      {' Send'}
                    </span>
                  </button>
                  {
                    messageSendingState === 'failed' && (
                      <div className="d-block invalid-feedback">
                        Message sending failed
                      </div>
                    )
                  }
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
