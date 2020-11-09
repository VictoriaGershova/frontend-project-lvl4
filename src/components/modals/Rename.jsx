import React, { useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { renameChannelById } from '../../api';
import channelSchema from './validation';

const RenameModal = (props) => {
  const { onHide, channel } = props;
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
  }, [null]);

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
              isInvalid={!!f.errors.name}
              ref={inputRef}
              onChange={f.handleChange}
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
              className="btn btn-secondary"
              type="button"
              onClick={onHide}
            >
              Cancel
            </Button>
            <Button
              disabled={f.isSubmitting}
              className="btn btn-primary ml-2"
              type="submit"
            >
              {f.isSubmitting && (
                <span
                  className="spinner-border spinner-border-sm mr-1"
                  role="status"
                  aria-hidden="true"
                />
              )}
              Rename
            </Button>
          </div>
          {f.status.isFailed && (
            <div className="text-danger mt-1 p-1">Network error. Try again</div>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameModal;
