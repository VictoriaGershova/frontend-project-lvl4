/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';
import AddChannelModal from './AddChannelModal';

const modalComponents = {
  REMOVE_CHANNEL: RemoveChannelModal,
  RENAME_CHANNEL: RenameChannelModal,
  ADD_CHANNEL: AddChannelModal,
};

const mapStateToProps = (state) => {
  const { type, props } = state.modal;
  return {
    modalType: type,
    modalProps: props,
  };
};

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) {
    return null;
  }
  const SpecificModal = modalComponents[modalType];
  return <SpecificModal {...modalProps} />;
};

export default connect(mapStateToProps)(ModalRoot);
