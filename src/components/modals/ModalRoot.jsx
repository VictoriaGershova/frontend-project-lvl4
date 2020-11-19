/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';
import AddChannelModal from './AddChannelModal';

const modalComponents = {
  REMOVE_CHANNEL: RemoveChannelModal,
  RENAME_CHANNEL: RenameChannelModal,
  ADD_CHANNEL: AddChannelModal,
};

const ModalRoot = () => {
  const { type: modalType, props: modalProps } = useSelector(({ modal }) => modal);
  if (!modalType) {
    return null;
  }
  const SpecificModal = modalComponents[modalType];
  return <SpecificModal {...modalProps} />;
};

export default ModalRoot;
