import axios from 'axios';
import config from '../../../config';

import store from '../redux/store';

const { baseURL, pathApi } = config;

export const headers = () => {
  const users = store.getState().users;
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'auth-token': `${users && users.user ? users.user.token : ''}`,
    Authorization: `${users && users.user ? users.user.token : ''}`,
  };
};

export const get = async (url, token) => {
  try {
    const res = await axios.get(`${baseURL}${pathApi}${url}`, {
      headers: token ? headers(token) : headers(),
    });
    // console.log('get res ------------>', res);
    return res;
  } catch (e) {
    const errors = e ? JSON.parse(JSON.stringify(e)) : { error: true };
    // console.log('get errors ------------>', errors);
    return errors;
  }
};

export const post = async (url, data, token) => {
  try {
    const res = await axios.post(`${baseURL}${pathApi}${url}`, data, {
      headers: headers(token),
    });
    // console.log('post res ------------>', res);
    return res;
  } catch (e) {
    // console.log('e.response', e.response);

    const errors = e && e.response ? e.response.data : { error: true };
    // console.log('post errors ------------>', errors);
    return errors;
  }
};

export const put = async (url, data = {}, token) => {
  try {
    const res = await axios.put(`${baseURL}${pathApi}${url}`, data, {
      headers: token ? headers(token) : headers(),
    });
    console.log('put res ------------>', res);
    return res;
  } catch (e) {
    const errors = e ? JSON.parse(JSON.stringify(e)) : { error: true };
    console.log('put errors ------------>', errors);
    return errors;
  }
};

export const remove = async (url, token) => {
  try {
    const res = await axios.delete(`${baseURL}${pathApi}${url}`, {
      headers: headers(token),
    });
    console.log('remove res ------------>', res);
    return res;
  } catch (e) {
    const errors = e ? JSON.parse(JSON.stringify(e)) : { error: true };
    console.log('remove errors ------------>', errors);
    return errors;
  }
};

export const patch = async () => {};

export default {
  get,
  patch,
  post,
  put,
  remove,
};
