import { combineReducers } from 'redux';
import { CATLIST } from './indexActions';
const dataState = {
    catList: []
};

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case CATLIST:
            state = Object.assign({}, state, { catList: action.catList });
            return state;
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    dataReducer,
});

export default rootReducer;
