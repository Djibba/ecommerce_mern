import React, {useContext} from 'react'
import { GlobalState } from '../../../GlobalState';
import ProductItem from '../utils/productItem/ProductItem';

function Product() {

  const state = useContext(GlobalState)
  const [products] = state.productsAPI.products
  return (
    <div className='products'>
      {
        products.map(product => {
          return <ProductItem key={product._id} product={product}/>
        })
      }
    </div>
  )
}

export default Product
