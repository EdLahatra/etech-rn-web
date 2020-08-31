import { get, post } from '../technique/api';

export default {
  getComptes: async (url) => await get(url),
  getDevices: async (url) => await get(url),
  createCompte: async (url, data) => await post(url, data),
  getCompte: async (url) => await get(url),
};
