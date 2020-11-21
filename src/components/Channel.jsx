import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  NavItem,
  NavLink,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';
import { showModal } from '../slices/modal';
import { getChannelById } from '../slices/selectors';
import { setCurrentChannelId } from '../slices/channels';

const DefaultChannel = ({ name, variant, handleSwitch }) => (
  <NavLink
    as={Button}
    block
    variant={variant}
    onClick={handleSwitch}
    className="text-left mb-2"
  >
    {name}
  </NavLink>
);

const UserChannel = (props) => {
  const {
    name,
    handleRemove,
    handleRename,
    handleSwitch,
    variant,
  } = props;
  return (
    <Dropdown as={ButtonGroup} className="d-flex mb-2">
      <NavLink
        as={Button}
        variant={variant}
        onClick={handleSwitch}
        className="flex-grow-1 text-left"
      >
        {name}
      </NavLink>
      <Dropdown.Toggle
        split
        variant={variant}
        className="flex-grow-0"
      />
      <Dropdown.Menu>
        <Dropdown.Item onSelect={handleRename}>Rename</Dropdown.Item>
        <Dropdown.Item onSelect={handleRemove}>Remove</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const Channel = ({ channelId }) => {
  const channel = useSelector((state) => getChannelById(state, channelId));
  if (!channel) {
    return null;
  }
  const dispatch = useDispatch();
  const { name, isActive, removable } = channel;
  const showChannelModal = (type) => dispatch(
    showModal({ type, props: { channelId } }),
  );
  const handleSwitch = () => dispatch(setCurrentChannelId({ id: channelId }));
  const handleRemove = () => showChannelModal('REMOVE_CHANNEL');
  const handleRename = () => showChannelModal('RENAME_CHANNEL');

  const variant = isActive ? 'primary' : 'light';

  if (removable) {
    return (
      <NavItem as="li">
        <UserChannel
          name={name}
          variant={variant}
          handleSwitch={handleSwitch}
          handleRemove={handleRemove}
          handleRename={handleRename}
        />
      </NavItem>
    );
  }
  return (
    <NavItem as="li">
      <DefaultChannel
        name={name}
        variant={variant}
        handleSwitch={handleSwitch}
      />
    </NavItem>
  );
};

export default Channel;
