import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {

  const [user, setUser] = useState({
    email:'', password:''
  })

  const onChangeInput = e => {
    const {name, value} = e.target;
    setUser({...user, [name]:value})
  }

  const loginSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('/user/login', {...user})

      localStorage.setItem('firstLogin', res.data.accesstoken)

      window.location.href = '/'
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  return (
    <div className='login-page'>
      <h2>Se connecter</h2>
      <form onSubmit={loginSubmit} >

        <input type="email" name="email" required placeholder='Votre adresse mail' value={user.email} onChange={onChangeInput} />

        <input type="password" name="password" required autoComplete='on' placeholder='Votre mot de passe' value={user.password} onChange={onChangeInput} />

        <div className="row">
          <button type="submit">Se connecter</button>
          <Link to='/register'>Créer un compte</Link>
        </div>
      </form>
    </div>
  )
}

export default Login
