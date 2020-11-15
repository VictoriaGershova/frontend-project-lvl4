import React from 'react';
import {
  Button,
  NavItem,
  NavLink,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';

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

const Channel = (props) => {
  const {
    channel: { name, isActive, removable },
    handleRemove,
    handleRename,
    handleSwitch,
  } = props;
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
