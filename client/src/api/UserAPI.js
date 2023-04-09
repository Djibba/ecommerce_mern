import { useState, useEffect } from 'react'
import axios  from 'axios';
import { async } from 'q';

export default function UserAPI(token) {

    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])

    useEffect(() => {
        if(token){
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infos', {
                        headers: {Authorization: token}
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                    
                } catch (err) {
                    alert(err.response.data.message)
                }
            }
            getUser()
        }
    },[token])

    const addCart = async (product) => {
        if(!isLogged) return alert('Connectez-vous pour acheter un produit !')

        const check = cart.every(item => {
            return item._id !== product._id
        })

        if(check){
            setCart([
                ...cart,
                {
                    ...product,
                    quantity: 1
                }
            ])
        }else {
            alert('Ce produit ajouté dans le panier.')
        }
    }


  return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart
    }
}
