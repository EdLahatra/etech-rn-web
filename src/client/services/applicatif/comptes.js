import comptes from '../bdl/comptes';

export default {
  getComptes: async (url) => await comptes.getComptes(url),
  getDevices: async (url) => await comptes.getDevices(url),
  createCompte: async (url, data, callBack) => await comptes.createCompte(url, data, callBack),
  getCompte: async (url) => await comptes.getCompte(url),
};
