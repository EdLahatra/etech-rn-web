import constants from '../constants/comptes';
import users from '../constants/users';

const initialState = {
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.getComptes:
      return {
        ...state,
        list: action.payload,
      };
    case users.logout:
      return initialState;
    default:
      return state;
  }
};
