import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({})

// eslint-disable-next-line react/prop-types
export function UserContextProvider({ children }) {
  const [username, setUsername] = useState(null)
  const [id, setid] = useState(null)
  useEffect(() => {
    axios.get('/profile').then(response => {
      setid(response.data.userId);
      setUsername(response.data.username);
    })
  }, [])

  return (
    <UserContext.Provider value={{ username, setUsername, id, setid }}>
      {children}
    </UserContext.Provider>
  )
}