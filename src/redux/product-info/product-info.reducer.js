import {
  PRODUCT_INFO
} from './types';

const initialState = {
  selected: null,
  loading: false,
  error: null
};

export const productInfoReducer = (state = initialState, action) => {

  switch (action.type) {

    case PRODUCT_INFO.REQUEST:
      return {
        ...state,
        selected: null,
        loading: true,
        error: null,
      }

    case PRODUCT_INFO.SUCCESS:
      return {
        ...state,
        selected: action.selected,
        loading: false,
        error: null,
      }

    case PRODUCT_INFO.RESET:
      return {
        ...initialState
      }

    default:
      return state;
  }
};