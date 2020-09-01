import constant from '../constants/network';

export const haveNetwork = connection => (dispatch) => {
  dispatch({
    type: constant.network,
    payload: { network: connection },
  });
};

export default { haveNetwork };
