import axios from "axios";
import { Register } from "./Register";

export function App() {
  axios.defaults.baseURL = "http://localhost:4040";
  axios.defaults.withCredentials = true;

  return (
    <Register />
  )
}