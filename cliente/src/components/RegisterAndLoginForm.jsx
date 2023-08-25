import axios from 'axios';
import { useContext, useState } from 'react'
import { UserContext } from '../UserContext';

export function RegisterAndLoginForm() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginOrRegister, setIsLoginOrRegister] = useState('register')
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext)

  async function handleSubmit(ev) {
    const url = isLoginOrRegister === 'register' ? 'register' : 'login'
    ev.preventDefault()
    const { data } = await axios.post(url, { username, password })
    setLoggedInUsername(username)
    setId(data.id)
  }

  return (
    <section className="bg-blue-50 h-screen flex items-center">
      <form className="w-72 mx-auto mb-12" onSubmit={handleSubmit}>

        <input value={username}
          onChange={ev => setUsername(ev.target.value)}
          type="text" placeholder="Usuario"
          className="block w-full rounded-sm p-2 mb-2 border" />

        <input value={password}
          onChange={ev => setPassword(ev.target.value)}
          type="password" placeholder="Contraseña"
          className="block w-full rounded-sm p-2 mb-2 border" />

        <button type='submit' className="bg-blue-500 text-white block w-full p-2 rounded-md">
          {isLoginOrRegister === 'register' ? 'Registrarse' : 'Iniciar Sessión'}
        </button>
        <div className='text-center mt-2'>
          {isLoginOrRegister === 'register' && (
            <div>
              Ya Estás Registrado ?
              <button className='ml-2 font-bold' onClick={() => setIsLoginOrRegister('login')}>
                Iniciar Sessión
              </button>
            </div>
          )}
          {isLoginOrRegister === 'login' && (
            <div>
              No Estás Registrado ?
              <button className='ml-2 font-bold' onClick={() => setIsLoginOrRegister('register')}>
                Registrarse
              </button>
            </div>
          )}
        </div>
      </form>

    </section>
  )
} 