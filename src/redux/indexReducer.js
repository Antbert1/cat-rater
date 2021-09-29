import { combineReducers } from 'redux';
import { TEMP } from './indexActions';
const dataState = {
    temp: ""
};

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case TEMP:
            state = Object.assign({}, state, { temp: action.temp });
            return state;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    dataReducer,
});

export default rootReducer;
