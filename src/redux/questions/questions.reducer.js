import {
  QUESTIONS
} from './types';

import mock from './questions.mock';

const initialState = {
  questions: mock,
  loading: false,
  error: null
};

export const productsReducer = (state = initialState, action) => {

  switch (action.type) {

    case QUESTIONS.SUCCESS:
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