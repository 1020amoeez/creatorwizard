// store.js
import { createStore } from 'redux';

// Define your initial state and reducer
const initialState = {
    exampleValue: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_EXAMPLE':
            return { ...state, exampleValue: action.payload };
        default:
            return state;
    }
};

// Create the Redux store
const store = createStore(reducer);

export default store;