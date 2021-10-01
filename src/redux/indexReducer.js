import { combineReducers } from 'redux';
import { CATLIST, LOADING } from './indexActions';
const dataState = {
    catList: [],
    loading: true
};

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case CATLIST:
            state = Object.assign({}, state, { catList: action.catList });
            return state;
        case LOADING:
            state = Object.assign({}, state, { loading: action.loading });
            return state;
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    dataReducer,
});

export default rootReducer;
