import constants from '../constants/users';

const initialState = {
  users: [],
  user: {},
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case constants.signinUSER:
      return {
        ...state,
        user: action.payload,
      };
    case constants.logout:
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};

export default users;
