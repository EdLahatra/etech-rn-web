import constants from '../constants/crud';

const initialState = {
  cruds: [],
  crud: {},
};

const crud = (state = initialState, action) => {
  switch (action.type) {
    case constants.getAll:
      return {
        ...state,
        cruds: action.payload,
      };
    default:
      return state;
  }
};

export default crud;
