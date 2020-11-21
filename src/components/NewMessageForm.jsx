import React, { useRef, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
  Form,
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

const NewMessageForm = () => {
  const currentChannelId = useSelector(getCurrentChannelId);
  const { userName } = useContext(UserContext);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  const handleSubmit = async ({ text }, { setFieldError, resetForm }) => {
    try {
      const message = { author: userName, text };
      await sendMessageByChannelId(currentChannelId, message);
      resetForm();
      inputRef.current.focus();
    } catch {
      setFieldError('text', 'Message sending failed');
      inputRef.current.focus();
    }
  };

  const f = useFormik({
    initialValues: { text: '' },
    onSubmit: handleSubmit,
  });

  return (
    <Form onSubmit={f.handleSubmit}>
      <FormGroup>
        <InputGroup>
          <FormControl
            name="text"
            type="text"
            autoComplete="off"
            ref={inputRef}
            disabled={f.isSubmitting}
            onChange={f.handleChange}
            isInvalid={f.errors.text}
            value={f.values.text}
            className="mr-2"
            data-testid="text"
          />
          <Button
            type="submit"
            variant="primary"
            disabled={f.isSubmitting}
            data-testid="submit"
          >
            {f.isSubmitting ? (
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
          <FormControl.Feedback data-testid="feedback" type="invalid">
            {f.errors.text}
          </FormControl.Feedback>
        </InputGroup>
      </FormGroup>
    </Form>
  );
};

export default NewMessageForm;
