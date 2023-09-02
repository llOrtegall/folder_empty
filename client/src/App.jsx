import Registro from "./Registro";
import axios from 'axios';

function App() {

  axios.defaults.baseURL = 'http://localhost:4040';
  axios.defaults.withCredentials = true;

  return (
    <Registro />
  )
}

export default App