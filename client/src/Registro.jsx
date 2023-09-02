import { useState } from 'react';

function Registro() {

  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  return (
    <section className="bg-blue-200 h-screen flex items-center">
      <form className="w-72 mx-auto mb-14">

        <input value={usuario} onChange={ev => setUsuario(ev.target.value)} type="text" placeholder="Usuario"
          className="block w-full rounded-md  border p-2 mb-2" />

        <input value={contrasena} onChange={ev => setContrasena(ev.target.value)} type="password" placeholder="Contraseña"
          className="block w-full rounded-md border p-2 mb-2" />

        <button className="bg-blue-500 text-white block w-full rounded-md p-2 font-semibold shadow-lg">Registrarse</button>
      </form>
    </section>
  )
}

export default Registro;