import React, { useEffect } from 'react';
import api from '../../services/api';
import './products.css';

import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../../components/product-card/productCard';
import { Grid, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { setSelectedProduct } from '../../redux/product-info/product-info.actions';
import { useHistory } from 'react-router-dom';
import { setProducts } from '../../redux/products/products.actions';

const useStyles = makeStyles((theme) => ({
  root: { 
    flexGrow: 1,
    padding: '5px',
    // backgroundColor: '#8080800f'
  },
  gridItem: {
    padding: '5px'
  }
}));


export default function Products() {

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const products = useSelector(state => state.productsReducer.products);
  
  useEffect(() => {
    api
    .get('/products')
    .then(x => {
      console.log('x', x.data)
      dispatch(setProducts(x.data))
    })
    .catch(err => console.error(err))
    
  },[dispatch])

  const onClickHandler = product => {
    dispatch(setSelectedProduct(product))
    history.push({
      pathname: `/products/${product.id}`,
      state: { 
        productInfo: product
      }
    })
  }
  
  // const goToProductInfo = (id, idx) => {
  //   console.log('object', id, idx)

  //   // dispatch(selectProduct())
  // }

  if(!products.length){
    return (
      <Grid className={classes.root} container spacing={0} style={{height: '100%'}}>
        <div style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <CircularProgress />
        </div>
      </Grid>
    )
  }

  return (
    <Grid className={classes.root} container spacing={0}>
      {products
        .map((product, idx) => 
          <Grid 
            item
            xs={12}
            sm={4}
            md={3}
            className={classes.gridItem}
            key={product.id}
          >
            <ProductCard   
              id={product.id}          
              title={product.title}
              imageSrc={product.secure_thumbnail}
              price='R$ 12,30'
              onClick={() => onClickHandler(product)}
            />
          </Grid>)}
    </Grid>
  )

}