import React from 'react';
import {
  Modal,
  Form,
  Button,
  Spinner,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { removeChannelById } from '../../api';

const RemoveModal = ({ onHide, channel }) => {
  const f = useFormik({
    initialValues: {},
    initialStatus: { isFailed: false },
    onSubmit: async (values, { setStatus }) => {
      try {
        setStatus({ isFailed: false });
        await removeChannelById(channel.id);
        onHide();
      } catch {
        setStatus({ isFailed: true });
      }
    },
  });
  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Delete this channel?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>All channel messages will be deleted forever.</p>
        <Form onSubmit={f.handleSubmit}>
          <Form.Group>
            <div className="d-flex justify-content-between">
              <Button
                variant="secondary"
                onClick={onHide}
              >
                No
              </Button>
              <Button
                disabled={f.isSubmitting}
                variant="danger"
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
                Yes, delete channel
              </Button>
            </div>
            {f.status.isFailed && (
              <div className="text-danger border-top mt-1 p-1">Network error. Try again</div>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveModal;
