import * as actionType from '../actionTypes';

const intialState = {
    user: '',
    token: null
};

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionType.SET_USER:
            return {
                state
            };
    }
};

export default reducer;
