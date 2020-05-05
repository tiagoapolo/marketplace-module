import { QUESTIONS } from './types'

export const fetchProducts = () => ({
  type: QUESTIONS.REQUEST,
});


export const setProductQuestions = questions => ({
  type: QUESTIONS.SUCCESS,
  questions
});

export const addProductQuestions = newQuestion => ({
  type: QUESTIONS.ADD,
  newQuestion
});

export const resetQuestions = () => ({
  type: QUESTIONS.RESET,
});