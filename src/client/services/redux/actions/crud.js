import constants from '../constants/crud';
import crudSapp from '../../applicatif/crud';

export const getAllCrud = (callBack) => async (dispatch) => {
  const payload = await crudSapp.getAllCrud();
  callBack && callBack(payload);
  if (payload) {
    return dispatch({
      type: constants.getAll,
      payload,
    });
  }
};
