import React, { useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { addChannel } from '../../api';

const channelSchema = yup.object().shape({
  name: yup.string()
    .min(2, 'Must be 3 to 20 characters')
    .max(50, 'Must be 3 to 20 characters')
    .required('Required'),
});

const AddModal = (props) => {
  const { onHide } = props;
  const f = useFormik({
    initialValues: { name: '' },
    validationSchema: channelSchema,
    onSubmit: async ({ name }) => {
      try {
        await addChannel({ name });
        onHide();
      } catch (err) {
        console.log(err);
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
        <Modal.Title>New channel</Modal.Title>
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
              Add channel
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
