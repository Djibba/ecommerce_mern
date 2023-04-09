import React from 'react'
import { Switch, Route } from "react-router-dom"

import Products from './products/Product'
import DetailProduct from './DetailProduct/DetailProduct'
import Login from './auth/Login'
import Register from './auth/Register'
import NotFound from './utils/not_found/NotFound'
import Cart from './cart/Cart';

function Pages() {
  return (
    <Switch>
      <Route path='/' exact component={Products} />
      <Route path='/detail/:id' exact component={DetailProduct} />
      <Route path='/login' exact component={Login} />
      <Route path='/cart' exact component={Cart} />
      <Route path='/register' exact component={Register} />

      <Route path='*' exact component={NotFound} />
    </Switch> 
  )
}

export default Pages
