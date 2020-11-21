import axios from 'axios';
import routes from './routes';

export const fetchMessagesByChannelId = (channelId) => {
  const url = routes.channelMessagesPath(channelId);
  return axios.get(url);
};

export const sendMessageByChannelId = (channelId, message) => {
  const url = routes.channelMessagesPath(channelId);
  const data = {
    data: { attributes: message },
  };
  return axios.post(url, data, { timeout: 10000 });
};

export const renameChannelById = (id, name) => {
  const url = routes.channelPath(id);
  const data = {
    data: {
      attributes: { name },
    },
  };
  return axios.patch(url, data, { timeout: 10000 });
};

export const addChannel = ({ name }) => {
  const url = routes.channelsPath();
  const data = {
    data: {
      attributes: { name },
    },
  };
  return axios.post(url, data, { timeout: 10000 });
};

export const removeChannelById = (id) => {
  const url = routes.channelPath(id);
  return axios.delete(url, { timeout: 10000 });
};
