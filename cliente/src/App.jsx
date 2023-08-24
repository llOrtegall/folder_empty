import { Register } from "./components/Register";
import axios from 'axios'

export function App() {
  axios.defaults.baseURL = "http://localhost:4040"
  axios.defaults.withCredentials = true

  return (
    <Register />
  )
}