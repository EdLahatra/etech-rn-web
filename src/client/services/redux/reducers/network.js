import constant from '../constants/network';

const initialState = {
    network: true,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case constant.network:
            return {
                ...state,
                network: action.payload.network,
            };

        default:
            return state;
    }
};
