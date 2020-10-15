import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import UserContext from '../userContext';
import routes from '../routes';

const mapStateToProps = (state) => {
  const { currentChannelId } = state;
  return {
    currentChannelId,
  };
};

const NewMessageForm = (props) => {
  const { currentChannelId } = props;
  return (
    <UserContext.Consumer>
      {({ userName }) => (
        <Formik
          initialValues={{ text: '' }}
          initialStatus={{ success: true }}
          onSubmit={async ({ text }, { setStatus, resetForm }) => {
            try {
              const url = routes.channelMessagesPath(currentChannelId);
              const message = { author: userName, text };
              await axios.post(url, { data: { attributes: message } });
              resetForm();
              setStatus({ success: true });
            } catch (err) {
              setStatus({ success: false });
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
                    !status.success && (
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
