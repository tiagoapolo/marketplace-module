import {
  PRODUCTS
} from './types';

import mock from './products.mock';

const initialState = {
  products: mock,
  loading: false,
  error: null
};

export const productsReducer = (state = initialState, action) => {

  switch (action.type) {

    case PRODUCTS.SUCCESS:
      return {
        ...state,
        purchases: [],
        loading: true,
        error: null,
      }
      
    default:
      return state;
  }
};