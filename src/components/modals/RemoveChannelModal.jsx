/* eslint no-shadow: 0 */
import React from 'react';
import {
  Modal,
  Form,
  Button,
  Spinner,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { removeChannelById } from '../../api';
import { hideModal } from '../../slices/modal';
import { getChannelById } from '../../slices/selectors';

const RemoveChannelModal = ({ channelId }) => {
  const dispatch = useDispatch();
  const hideRemoveChannelModal = () => dispatch(hideModal());
  const channel = useSelector((state) => getChannelById(state, channelId));
  const channelName = channel ? channel.name : '';
  const f = useFormik({
    initialValues: {},
    initialStatus: { isFailed: false },
    onSubmit: async (values, { setStatus }) => {
      try {
        setStatus({ isFailed: false });
        await removeChannelById(channel.id);
        hideRemoveChannelModal();
      } catch {
        setStatus({ isFailed: true });
      }
    },
  });
  return (
    <Modal show>
      <Modal.Header closeButton onHide={hideRemoveChannelModal}>
        <Modal.Title>
          {`Delete channel ${channelName}?`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>All channel messages will be deleted forever.</p>
        <Form onSubmit={f.handleSubmit}>
          <Form.Group>
            <div className="d-flex justify-content-between">
              <Button
                variant="secondary"
                onClick={hideRemoveChannelModal}
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

export default RemoveChannelModal;
