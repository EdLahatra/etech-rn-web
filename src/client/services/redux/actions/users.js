import constants from '../constants/users';
import usersSapp from '../../applicatif/users';

export const signin = (data, callBack) => async (dispatch) => {
  const res = await usersSapp.signin(constants.url.signin, data);
  callBack && callBack(res);
  if (res && res.data && res.data.data) {
    return dispatch({
      type: constants.signinUSER,
      payload: res.data.data,
    });
  }
};

export const signup = (data, callBack) => async () => {
  const payload = await usersSapp.signup(constants.url.signup, data);
  callBack && callBack(payload);
};

export const logout = () => (dispatch) => dispatch({ type: constants.logout });

export default { signin, signup, logout };
