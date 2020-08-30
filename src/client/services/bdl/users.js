import { post } from '../technique/api';

export default {
  signin: async (url, data) => await post(url, data),
  signup: async (url, data) => await post(url, data),
};
