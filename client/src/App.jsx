import Registro from "./Registro";
import axios from 'axios';

function App() {

  axios.defaults.baseURL = 'http://localhost:3030';
  axios.defaults.withCredentials = true;

  return (
    <Registro />
  )
}

export default App