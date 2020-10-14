import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { channels: { byId, allIds }, currentChannelId } = state;
  const channels = allIds.map((id) => byId[id]);
  return { channels, currentChannelId };
};

const actionCreators = {
  updateCurrentChannelId: actions.updateCurrentChannelId,
};

const Channel = ({ channel, isActive, onClick }) => {
  const channelClass = cn({
    'nav-link btn-block mb-2 text-left btn': true,
    'btn-primary': isActive,
    'btn-light': !isActive,
  });
  return (
    <li className="nav-item">
      <button type="button" className={channelClass} onClick={onClick}>
        {channel.name}
      </button>
    </li>
  );
};

const ChannelsList = (props) => {
  const {
    channels,
    currentChannelId,
    updateCurrentChannelId,
  } = props;
  return (
    <>
      <div className="d-flex mb-2">
        <span>Channnels</span>
        <button type="button" className="ml-auto p-0 btn btn-link">
          <span><i className="fas fa-plus" /></span>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            isActive={channel.id === currentChannelId}
            onClick={() => updateCurrentChannelId({ id: channel.id })}
          />
        ))}
      </ul>
    </>
  );
};

export default connect(mapStateToProps, actionCreators)(ChannelsList);
