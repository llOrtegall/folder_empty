export function Register() {
  return (
    <section className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto">
        <input type="text" placeholder="Usuario"
          className="block w-full rounded-sm p-2 mb-2 border" />
        <input type="password" placeholder="Contraseña"
          className="block w-full rounded-sm p-2 mb-2 border" />
        <button className="bg-blue-500 text-white block w-full p-2 rounded-md">
          Registrase
        </button>
      </form>
    </section>
  )
} 