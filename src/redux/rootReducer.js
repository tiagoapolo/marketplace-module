/* Modules */
import { combineReducers } from 'redux';

/* Reducers */
import {productsReducer} from './products/products.reducer';
import { productInfoReducer } from './product-info/product-info.reducer';
import { questionsReducer } from './questions/questions.reducer';

// all the reducers are in one place
const rootReducers = combineReducers({
    productsReducer: productsReducer,
    productInfoReducer: productInfoReducer,
    questionsReducer: questionsReducer,
})

export default rootReducers;