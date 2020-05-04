/* Modules */
import { combineReducers } from 'redux';

/* Reducers */
import {productsReducer} from './products/products.reducer';

// all the reducers are in one place
const rootReducers = combineReducers({
    productsReducer: productsReducer,
})

export default rootReducers;