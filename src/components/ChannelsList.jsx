import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

const mapStateToProps = (state) => {
  const { channels: { byId, allIds }, currentChannelId } = state;
  const channels = allIds.map((id) => byId[id]);
  return { channels, currentChannelId };
};

const Channel = ({ channel, isActive }) => {
  const channelClass = cn({
    'nav-link btn-block mb-2 text-left btn': true,
    'btn-primary': isActive,
    'btn-light': !isActive,
  });

  return (
    <li className="nav-item">
      <button type="button" className={channelClass}>
        {channel.name}
      </button>
    </li>
  );
};

const ChannelsList = (props) => {
  const { channels, currentChannelId } = props;
  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channnels</span>
        <button type="button" className="ml-auto p-0 btn btn-link">+</button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            isActive={channel.id === currentChannelId}
          />
        ))}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps)(ChannelsList);
