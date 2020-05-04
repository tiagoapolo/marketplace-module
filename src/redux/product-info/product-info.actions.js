import { PRODUCT_INFO } from './types'

export const setSelectedProduct = product => ({
  type: PRODUCT_INFO.SUCCESS,
  selected: product
});


export const reset = () => ({
  type: PRODUCT_INFO.RESET,
});