/* eslint no-shadow: 0 */
import React, { useEffect, useRef } from 'react';
import {
  Modal,
  Form,
  Button,
  Spinner,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { renameChannelById } from '../../api';
import { hideModal } from '../../slices/modal';
import { getChannelById } from '../../slices/selectors';
import channelSchema from './validation';

const mapStateToProps = (state, ownProps) => ({
  channel: getChannelById(state, ownProps.channelId),
});

const RenameChannelModal = ({ hideModal, channel }) => {
  const f = useFormik({
    initialValues: { name: channel.name },
    initialStatus: { isFailed: false },
    validationSchema: channelSchema,
    onSubmit: async ({ name }, { setStatus }) => {
      try {
        setStatus({ isFailed: false });
        await renameChannelById(channel.id, name);
        hideModal();
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
      <Modal.Header closeButton onHide={hideModal}>
        <Modal.Title>
          {`Rename channel ${channel.name}`}
        </Modal.Title>
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
              onClick={hideModal}
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

export default connect(mapStateToProps, { hideModal })(RenameChannelModal);
