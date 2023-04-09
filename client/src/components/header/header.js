import React, {useContext} from 'react'
import { Link } from 'react-router-dom'

import menu from './icons/menu.svg'
import cartIcon from './icons/cart.svg'
import close from './icons/close.svg'
import { GlobalState } from './../../GlobalState';
import axios from 'axios'

function Header() {

  const state = useContext(GlobalState)
  const [isLogged, setIsLogged] = state.userAPI.isLogged
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin
  const [cart] = state.userAPI.cart

  const logoutUser = async () => {
    await axios.get('/user/logout')
    localStorage.clear()
    setIsAdmin(false)
    setIsLogged(false)
  }

  const adminRouter = () => {
    return (
      <>
        <li><Link to="/create_product">Creer un produit</Link></li>
        <li><Link to="/category">Categories</Link></li>
      </>
    )
  }

  const loggedRouter = () => {
    return (
      <>
        <li><Link to="/history">Historique</Link></li>
        <li><Link to="/" onClick={logoutUser}>Se déconnecter</Link></li>
      </>
    )
  }

  return (
    <header>
      <div className='menu'>
        <img src={menu} alt="" width="30"/>
      </div>

      <div className='logo'>
        <h1>
          <Link to="/">{ isAdmin ? 'Admin' : 'Oumou Market' }</Link>
        </h1> 
      </div> 

      <ul>
        <li><Link to="/">{ isAdmin ? 'Produits' : 'Market' }</Link></li>

        {isAdmin && adminRouter()}
        {
          isLogged ? loggedRouter() : <li><Link to="/login">Se connecter</Link></li>
        }


        <li>
          <img src={close} alt="" width="30" className='menu' />
        </li>
      </ul>

      {
        isAdmin ? '' :
        <div className='cart-icon'>
          <span>{ cart.length }</span>
          <Link to="/cart">
            <img src={cartIcon} alt="" width="30" />
          </Link>
        </div>
      }


    </header>
  )
}

export default Header
