import comptes from '../bdl/comptes';

export default {
  getComptes: async (url) => await comptes.getComptes(url),
  createCompte: async (url, data, callBack) => await comptes.createCompte(url, data, callBack),
  getCompte: async (url) => await comptes.getCompte(url),
};
