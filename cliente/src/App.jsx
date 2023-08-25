import { useContext } from "react";
import { Register } from "./components/Register";
import { UserContext, UserContextProvider } from './UserContext'
import axios from 'axios'

export function App() {
  axios.defaults.baseURL = "http://localhost:4040"
  axios.defaults.withCredentials = true
  const { username } = useContext(UserContext)
  console.log(username)
  return (
    <UserContextProvider>
      <Register />
    </UserContextProvider>
  )
}