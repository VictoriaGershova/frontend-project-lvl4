/* eslint no-shadow: 0 */
import React from 'react';
import {
  Modal,
  Form,
  Button,
  Spinner,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { removeChannelById } from '../../api';
import { hideModal } from '../../slices/modal';
import { getChannelById } from '../../slices/selectors';

const mapStateToProps = (state, ownProps) => ({
  channel: getChannelById(state, ownProps.channelId),
});

const RemoveChannelModal = ({ hideModal, channel }) => {
  const f = useFormik({
    initialValues: {},
    initialStatus: { isFailed: false },
    onSubmit: async (values, { setStatus }) => {
      try {
        setStatus({ isFailed: false });
        await removeChannelById(channel.id);
        hideModal();
      } catch {
        setStatus({ isFailed: true });
      }
    },
  });
  return (
    <Modal show>
      <Modal.Header closeButton onHide={hideModal}>
        <Modal.Title>
          {`Delete channel ${channel && channel.name}?`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>All channel messages will be deleted forever.</p>
        <Form onSubmit={f.handleSubmit}>
          <Form.Group>
            <div className="d-flex justify-content-between">
              <Button
                variant="secondary"
                onClick={hideModal}
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

export default connect(mapStateToProps, { hideModal })(RemoveChannelModal);
