import React, { useEffect, useRef } from 'react';
import {
  Modal,
  Form,
  Button,
  Spinner,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { renameChannelById } from '../../api';
import channelSchema from './validation';

const RenameModal = ({ onHide, channel }) => {
  const f = useFormik({
    initialValues: { name: channel.name },
    initialStatus: { isFailed: false },
    validationSchema: channelSchema,
    onSubmit: async ({ name }, { setStatus }) => {
      try {
        setStatus({ isFailed: false });
        await renameChannelById(channel.id, name);
        onHide();
      } catch {
        setStatus({ isFailed: true });
      }
    },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Rename channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={f.handleSubmit}>
          <Form.Group>
            <Form.Control
              required
              disabled={f.isSubmitting}
              isInvalid={f.touched.name && f.errors.name}
              ref={inputRef}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.name}
              name="name"
              type="text"
            />
            <Form.Control.Feedback type="invalid">
              {f.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button
              variant="secondary"
              onClick={onHide}
            >
              Cancel
            </Button>
            <Button
              disabled={f.isSubmitting}
              variant="primary"
              className="ml-2"
              type="submit"
            >
              {f.isSubmitting && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="mr-1"
                />
              )}
              Rename
            </Button>
          </div>
          {f.status.isFailed && (
            <div className="text-danger border-top mt-1 p-1">Network error. Try again</div>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameModal;
