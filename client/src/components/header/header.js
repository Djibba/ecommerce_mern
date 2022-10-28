import React from 'react'
import { Link } from 'react-router-dom'

import menu from './icons/menu.svg'
import cart from './icons/cart.svg'
import close from './icons/close.svg'

function Header() {
  return (
    <header>
      <div className='menu'>
        <img src={menu} alt="" width="30"/>
      </div>

      <div className='logo'>
        <h1>
          <Link to="/">Oumou Market</Link>
        </h1> 
      </div> 

      <ul>
        <li><Link to="/">Produits</Link></li>
        <li><Link to="/login">Se connecter</Link></li>

        <li>
          <img src={close} alt="" width="30" className='menu' />
        </li>
      </ul>

      <div className='cart-icon'>
        <span>0</span>
        <Link to="/cart">
          <img src={cart} alt="" width="30" />
        </Link>
      </div>

    </header>
  )
}

export default Header
