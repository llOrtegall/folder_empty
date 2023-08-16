import { useContext } from "react";
import { Register } from "./Register";
import { UserContext } from "./UserContext";

export function Routes() {
  const { username, id } = useContext(UserContext);
  if (username) {
    return 'logged in ¡¡' + username
  }

  return (
    <Register />
  )
}