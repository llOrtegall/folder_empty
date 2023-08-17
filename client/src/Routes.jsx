import { useContext } from "react";
import { RegisterAndLoginForm } from "./RegisterAndLoginForm";
import { UserContext } from "./UserContext";

export function Routes() {
  const { username } = useContext(UserContext);

  if (username) {
    return 'logged in ¡¡' + username
  }

  return (
    <RegisterAndLoginForm />
  )
}