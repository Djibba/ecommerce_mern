import React, {useState, useEffect} from 'react'
import axios from 'axios';

function ProductsAPI() {

    const [products, setProducts] = useState([])

    const getProducts = async () => {
        const res = await axios.get('/product/all')
        setProducts(res.data.products)
    }

    useEffect(() => {
        getProducts()
    },[])

  return {
    products: [products, setProducts]
  }
  
}

export default ProductsAPI
