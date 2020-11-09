import React, { useRef, useEffect } from 'react';
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
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, [null]);
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
              inputRef.current.focus();
            } catch {
              setStatus({ isFailed: true });
              inputRef.current.focus();
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
                    ref={inputRef}
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
                      {isSubmitting ? (
                        <span
                          className="spinner-border spinner-border-sm mr-1"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : <i className="fas fa-envelope" />}
                      {' Send'}
                    </span>
                  </button>
                  {status.isFailed && (
                    <div className="d-block invalid-feedback">
                      Message sending failed
                    </div>
                  )}
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
