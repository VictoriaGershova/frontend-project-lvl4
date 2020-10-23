import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const getOnSubmit = (onHide, deleteChannel) => (e) => {
  e.preventDefault();
  deleteChannel();
  onHide();
};

const RemoveModal = (props) => {
  const { onHide, action: deleteChannel } = props;
  const handleSubmit = getOnSubmit(onHide, deleteChannel);
  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Delete this channel?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        All channel messages will be deleted forever.
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <div className="d-flex justify-content-between pt-2">
              <Button className="btn btn-secondary" type="button" onClick={onHide}>No</Button>
              <Button className="btn btn-danger ml-2" type="submit">Yes, delete channel</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveModal;
