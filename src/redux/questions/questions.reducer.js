import {
  QUESTIONS
} from './types';

const initialState = {
  questions: [],
  loading: false,
  error: null
};

export const questionsReducer = (state = initialState, action) => {

  switch (action.type) {

    case QUESTIONS.REQUEST:
      return {
        ...state,
        questions: [],
        loading: true,
        error: null,
      }

    case QUESTIONS.SUCCESS:
      return {
        ...state,
        questions: action.questions,
        loading: false,
        error: null,
      }

    case QUESTIONS.ADD:
      return {
        ...state,
        questions: ([action.newQuestion]).concat(state.questions),
        loading: false,
        error: null,
      }      

    case QUESTIONS.RESET:
      return {
        ...initialState
      }
      
    default:
      return state;
  }
};