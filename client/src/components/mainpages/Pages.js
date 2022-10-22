import React from 'react'
import { Switch, Route } from "react-router-dom"

import Products from './products/product'
import Cart from './cart/cart'
import Login from './auth/login'
import Register from './auth/register'
import NotFound from './utils/not_found/NotFound'

function Pages() {
  return (
    <Switch>
      <Route path='/' exact component={Products} />
      <Route path='/login' exact component={Login} />
      <Route path='/cart' exact component={Cart} />
      <Route path='/register' exact component={Register} />

      <Route path='*' exact component={NotFound} />
    </Switch>
  )
}

export default Pages
