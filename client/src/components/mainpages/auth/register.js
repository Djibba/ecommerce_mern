import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {

  const [user, setUser] = useState({
    name:'', email:'', password:''
  })

  const onChangeInput = e => {
    const {name, value} = e.target;
    setUser({...user, [name]:value})
  }

  const RegisterSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('/user/register', {...user})

      localStorage.setItem('firstLogin', true)

      window.location.href = '/'
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  return (
    <div className='login-page'>
      <h2>Créer un compte</h2>
      <form onSubmit={RegisterSubmit} >

        <input type="text" name="name" required placeholder='Votre nom' value={user.name} onChange={onChangeInput} />

        <input type="email" name="email" required placeholder='Votre adresse mail' value={user.email} onChange={onChangeInput} />

        <input type="password" name="password" required autoComplete='on' placeholder='Votre mot de passe' value={user.password} onChange={onChangeInput} />

        <div className="row">
          <button type="submit">Créer un compte</button>
          <Link to='/login'>Se connecter</Link>
        </div>
      </form>
    </div>
  )
}

export default Register
