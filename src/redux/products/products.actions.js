import { PRODUCTS } from './types'

export const setProducts = products => ({
  type: PRODUCTS.SUCCESS,
  products: products, 
});
