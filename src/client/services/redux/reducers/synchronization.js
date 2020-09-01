import constants from '../constants/synchronization';

const initialState = {
  data: [],
  isSyncing: false,
};

const synchronize = (state = initialState, action) => {
  switch (action.type) {
    case constants.synchronize:
      return {
        ...state,
        data: action.payload,
      };
      case constants.isSynchronizing:
      return {
        ...state,
        isSyncing: action.payload,
      };
    default:
      return state;
  }
};

export default synchronize;
