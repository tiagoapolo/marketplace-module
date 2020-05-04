/* Modules */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter, Redirect } from 'react-router';

// Containers
import NotFound from '../containers/not-found/notFound'
import Products from '../containers/products/products';
import ProductInfo from '../containers/product-info/productInfo';
import Admin from '../containers/admin/admin';


function MyRouter() {
    return (
      <Switch>
        <Route 
          exact 
          path="/" 
          children={() => (
            <Redirect to="/products" />
          )} 
        />
        <Route exact path="/products">
          <Products/>
        </Route>
        <Route exact path="/products/:id">
          <ProductInfo/>
        </Route>
        <Route exact path="/admin">
          <Admin/>
        </Route>        
        <Route path="*" component={NotFound} />
      </Switch>
    )
}

export default withRouter(MyRouter);
