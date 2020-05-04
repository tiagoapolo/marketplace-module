import {
  PRODUCTS
} from './types';

// import mock from './products.mock';

const initialState = {
  products: [],
  loading: false,
  error: null
};

export const productsReducer = (state = initialState, action) => {

  switch (action.type) {

    case PRODUCTS.SUCCESS:
      return {
        ...state,
        products: ([]).concat(action.products),
        loading: false,
        error: null,
      }
    default:
      return state;
  }
};