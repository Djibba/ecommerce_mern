import React, {useContext} from 'react'
import { GlobalState } from './../../../GlobalState';
import { Link } from 'react-router-dom';

export default function Cart() {
    
    const state = useContext(GlobalState)
    const [cart] = state.userAPI.cart

    if(cart.length === 0) {
        return <h2 style={{ textAlign: 'center', fontSize: '5rem' }} >Pas de produits sur le panier.</h2>
    }

  return (
    <div>
        {
            cart.map(product => (
                <div className='detail'>
                    <img src={product.images.url} alt='' />

                    <div className='box-detail'>
                        <div className='row'>
                            <h2>{product.title}</h2>
                            <h6>{product.product_id}</h6>
                        </div>
                        <span>{product.price} FCFA</span>
                        <p>{product.description}</p>
                        <p>{product.content}</p>
                        <p>Solde: {product.sold}</p>
                        <Link to="/cart" className='cart'>Acheter Maintenant</Link>
                    </div>
                </div>
            ))
        }
    </div>
  )
}
