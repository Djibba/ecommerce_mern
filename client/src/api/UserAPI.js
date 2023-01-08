import React, { useState, useEffect } from 'react'
import axios  from 'axios';

export default function UserAPI(token) {

    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        if(token){
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infos', {
                        headers: {Authorization: token}
                    })

                    console.log(res)
                } catch (err) {
                    alert(err.response.data.message)
                }
            }
            getUser()
        }
    },[token])

  return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin]
    }
}
