import axios from 'axios';
import routes from './routes';

export const fetchMessagesByChannelId = async (channelId) => {
  const url = routes.channelMessagesPath(channelId);
  const res = await axios.get(url);
  return res;
};

export const updateChannelById = async (id, fields) => {
  const url = routes.channelPath(id);
  const res = await axios.patch(url, { data: { attributes: fields } });
  return res;
};

export const createChannel = async (fields) => {
  const url = routes.channelsPath();
  const res = await axios.post(url, { data: { attributes: fields } });
  return res;
};

export const deleteChannelById = async (id) => {
  const url = routes.channelPath(id);
  const res = await axios.delete(url);
  return res;
};
