import { useContext } from "react";
import { RegisterAndLoginForm } from "./components/RegisterAndLoginForm";
import { UserContext } from "./UserContext";

export function Routes() {
  const { username, id } = useContext(UserContext)
  console.log(id)

  if (username) {
    return 'logged in !!!' + username
  }

  return (
    <RegisterAndLoginForm />
  )
}