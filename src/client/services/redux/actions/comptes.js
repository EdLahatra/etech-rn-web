import constants from '../constants/comptes';
import comptesSapp from '../../applicatif/comptes';

export const getComptes = (callBack) => async (dispatch) => {
  const payload = await comptesSapp.getComptes(constants.url.comptes);
  callBack && callBack(payload);
  if (payload && payload.data && payload.data.length > 0) {
    return dispatch({
      type: constants.getComptes,
      payload: payload.data,
    });
  }
};

export const getCompte = (callBack) => async (dispatch) => {
  const payload = await comptesSapp.getCompte(constants.url.comptes);
  callBack && callBack(payload);
  if (payload) {
    return dispatch({
      type: constants.getCompte,
      payload,
    });
  }
};

export const createCompte = (data, callBack) => async (dispatch) => {
  const payload = await comptesSapp.createCompte(constants.url.comptes, data, callBack);
  callBack && callBack(payload);
  if (payload) {
    return dispatch({
      type: constants.createCompte,
      payload,
    });
  }
};

export default { createCompte, getCompte, getComptes };
