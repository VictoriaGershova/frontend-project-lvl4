import React from 'react';
import cn from 'classnames';

const DefaultChannel = (props) => {
  const {
    channel: { name, isActive },
    handleSwitch,
  } = props;
  const btnColorClass = cn({
    'btn-primary': isActive,
    'btn-light': !isActive,
  });
  return (
    <button
      type="button"
      className={`mb-2 nav-link btn-block text-left btn ${btnColorClass}`}
      onClick={handleSwitch}
    >
      {name}
    </button>
  );
};

const UserChannel = (props) => {
  const {
    channel: { name, isActive },
    handleSwitch,
    handleRename,
    handleRemove,
  } = props;
  const btnColorClass = cn({
    'btn-primary': isActive,
    'btn-light': !isActive,
  });
  return (
    <div className="d-flex mb-2 dropdown btn-group">
      <button
        type="button"
        className={`flex-grow-1 nav-link btn-block text-left btn ${btnColorClass}`}
        onClick={handleSwitch}
      >
        {name}
      </button>
      <button
        id="channelMenu"
        type="button"
        className={`flex-grow-0 dropdown-toggle dropdown-toggle-split btn border-left ${btnColorClass}`}
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span className="sr-only">Toggle Dropdown</span>
      </button>
      <div className="dropdown-menu" aria-labelledby="channelMenu">
        <button type="button" className="dropdown-item" onClick={handleRename}>Rename</button>
        <button type="button" className="dropdown-item" onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
};

const Channel = (props) => {
  const {
    channel,
    handleSwitch,
    handleRename,
    handleRemove,
  } = props;
  if (channel.removable) {
    return (
      <UserChannel
        channel={channel}
        handleSwitch={handleSwitch}
        handleRename={handleRename}
        handleRemove={handleRemove}
      />
    );
  }
  return (
    <DefaultChannel
      channel={channel}
      handleSwitch={handleSwitch}
    />
  );
};

export default Channel;
