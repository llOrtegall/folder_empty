export function Register() {
  return (
    <div className="bg-blue-100 h-screen flex items-center">
      <form className="w-64 mx-auto ">
        <input type="text" placeholder="Usuario" className="block w-full rounded-sm p-2 mb-2" />
        <input type="password" placeholder="Contraseña" className="block w-full rounded-sm p-2 mb-2" />
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2">Register</button>
      </form>
    </div>
  )
}