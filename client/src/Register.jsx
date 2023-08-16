import { useContext, useState } from "react"
import axios from "axios";
import { UserContext } from "./UserContext";

export function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggindOrRegister, setIsLoggindOrRegister] = useState('register');
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

  async function register(ev) {
    ev.preventDefault();
    const { data } = await axios.post('/register', { username, password });
    setLoggedInUsername(username);
    setId(data.id);
  }

  return (
    <div className="bg-blue-100 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={register}>
        <input value={username}
          onChange={ev => setUsername(ev.target.value)}
          type="text" placeholder="Usuario"
          className="block w-full rounded-sm p-2 mb-2" />
        <input value={password}
          onChange={ev => setPassword(ev.target.value)}
          type="password" placeholder="Contraseña"
          className="block w-full rounded-sm p-2 mb-2" />
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
          {isLoggindOrRegister === 'register' ? 'Registrarse' : 'Iniciar Sesión'}
        </button>
        <div className="text-center mt-2 font-semibold">
          {isLoggindOrRegister === 'register' && (
            <div>
              Ya estás registrado?
              <button onClick={() => setIsLoggindOrRegister('login')}
                className="text-violet-600 font-semibold pl-2">
                Iniciar Sesión
              </button>
            </div>
          )}
          {isLoggindOrRegister === 'login' && (
            <div>
              No estás registrado ?
              <button onClick={() => setIsLoggindOrRegister('register')}
                className="text-violet-600 font-semibold pl-2">
                Registrarse
              </button>
            </div>
          )}
        </div>
      </form >
    </div >
  )
}