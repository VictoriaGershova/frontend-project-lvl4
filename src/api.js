import axios from 'axios';
import routes from './routes';

export const fetchMessagesByChannelId = async (channelId) => {
  const url = routes.channelMessagesPath(channelId);
  const res = await axios.get(url);
  return res;
};

export const sendMessageByChannelId = async (channelId, message) => {
  const url = routes.channelMessagesPath(channelId);
  const data = {
    data: { attributes: message },
  };
  const res = await axios.post(url, data, { timeout: 10000 });
  return res;
};

export const renameChannelById = async (id, name) => {
  const url = routes.channelPath(id);
  const data = {
    data: {
      attributes: { name },
    },
  };
  const res = await axios.patch(url, data, { timeout: 10000 });
  return res;
};

export const addChannel = async ({ name }) => {
  const url = routes.channelsPath();
  const data = {
    data: {
      attributes: { name },
    },
  };
  const res = await axios.post(url, data, { timeout: 10000 });
  return res;
};

export const removeChannelById = async (id) => {
  const url = routes.channelPath(id);
  const res = await axios.delete(url, { timeout: 10000 });
  return res;
};
