import { useContext } from "react";
import RegisterAndLoginForm from "./RegisterAndLoginForm";
import { UserContext } from "./UserContext";

export default function Routes() {
  const { username } = useContext(UserContext);
  if (username) {
    return 'logging in' + username;
  }
  return (
    <RegisterAndLoginForm />
  )
}