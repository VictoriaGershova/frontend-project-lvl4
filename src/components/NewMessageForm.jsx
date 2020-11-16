import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import {
  FormGroup,
  FormControl,
  InputGroup,
  Button,
  Spinner,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import UserContext from './userContext';
import { sendMessageByChannelId } from '../api';
import { getCurrentChannelId } from '../slices/selectors';

const mapStateToProps = (state) => ({ currentChannelId: getCurrentChannelId(state) });

const NewMessageForm = ({ currentChannelId }) => {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });
  return (
    <UserContext.Consumer>
      {({ userName }) => (
        <Formik
          initialValues={{ text: '' }}
          onSubmit={async ({ text }, { setFieldError, resetForm }) => {
            try {
              const message = { author: userName, text };
              await sendMessageByChannelId(currentChannelId, message);
              resetForm();
              inputRef.current.focus();
            } catch {
              setFieldError('text', ' Message sending failed');
              inputRef.current.focus();
            }
          }}
        >
          {({
            handleChange,
            values,
            isSubmitting,
            errors,
          }) => (
            <Form>
              <FormGroup>
                <InputGroup>
                  <FormControl
                    name="text"
                    type="text"
                    autoComplete="off"
                    ref={inputRef}
                    disabled={isSubmitting}
                    onChange={handleChange}
                    isInvalid={errors.text}
                    value={values.text}
                    className="mr-2"
                  />
                  <Button type="submit" variant="primary" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="mr-1"
                      />
                    ) : <FontAwesomeIcon icon={faEnvelope} />}
                    <span>{' Send'}</span>
                  </Button>
                  <FormControl.Feedback type="invalid">
                    {errors.text}
                  </FormControl.Feedback>
                </InputGroup>
              </FormGroup>
            </Form>
          )}
        </Formik>
      )}
    </UserContext.Consumer>
  );
};

export default connect(mapStateToProps)(NewMessageForm);
