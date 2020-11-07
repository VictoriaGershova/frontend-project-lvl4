import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import UserContext from './userContext';
import { sendMessageByChannelId } from '../api';
import { getCurrentChannel } from '../slices/channels';

const mapStateToProps = (state) => {
  const currentChannel = getCurrentChannel(state);
  return {
    currentChannelId: currentChannel.id,
  };
};

const NewMessageForm = (props) => {
  const { currentChannelId } = props;
  return (
    <UserContext.Consumer>
      {({ userName }) => (
        <Formik
          initialValues={{ text: '' }}
          initialStatus={{ isFailed: false }}
          onSubmit={async ({ text }, { setStatus, resetForm }) => {
            try {
              setStatus({ isFailed: false });
              const message = { author: userName, text };
              await sendMessageByChannelId(currentChannelId, message);
              resetForm();
            } catch {
              setStatus({ isFailed: true });
            }
          }}
        >
          {({
            handleChange,
            values,
            isSubmitting,
            status,
          }) => (
            <Form>
              <div className="form-group">
                <div className="input-group">
                  <input
                    name="text"
                    type="text"
                    autoComplete="off"
                    disabled={isSubmitting}
                    onChange={handleChange}
                    className="mr-2 form-control"
                    value={values.text}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    <span>
                      <i className="fas fa-envelope" />
                      {' Send'}
                    </span>
                  </button>
                  {
                    status.isFailed && (
                      <div className="d-block invalid-feedback">
                        Message sending failed
                      </div>
                    )
                  }
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </UserContext.Consumer>
  );
};

export default connect(mapStateToProps)(NewMessageForm);
