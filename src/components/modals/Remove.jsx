import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { removeChannelById } from '../../api';

const RemoveModal = (props) => {
  const { onHide, channel } = props;
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
        All channel messages will be deleted forever.
        <Form onSubmit={f.handleSubmit}>
          <Form.Group>
            <div className="d-flex justify-content-between pt-2">
              <Button
                className="btn btn-secondary"
                type="button"
                onClick={onHide}
              >
                No
              </Button>
              <Button
                disabled={f.isSubmitting}
                className="btn btn-danger ml-2"
                type="submit"
              >
                {f.isSubmitting && (
                <span
                  className="spinner-border spinner-border-sm mr-1"
                  role="status"
                  aria-hidden="true"
                />
                )}
                Yes, delete channel
              </Button>
            </div>
            {f.status.isFailed && (
              <div className="text-danger mt-1 p-1">Network error. Try again</div>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveModal;
