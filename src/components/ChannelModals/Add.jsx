import React, { useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';

const getOnSubmit = (onHide, createChannel) => (values) => {
  const { name } = values;
  createChannel({ name });
  onHide();
};

const AddModal = (props) => {
  const { onHide, action: createChannel } = props;
  const f = useFormik({
    initialValues: { name: '' },
    onSubmit: getOnSubmit(onHide, createChannel),
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
              ref={inputRef}
              onChange={f.handleChange}
              value={f.values.name}
              name="name"
              type="text"
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button className="btn btn-secondary" type="button" onClick={onHide}>Cancel</Button>
            <Button className="btn btn-primary ml-2" type="submit">Add channel</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
