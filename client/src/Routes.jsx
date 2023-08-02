import { useContext } from "react";
import Register from "./Register";
import { UserContext } from "./UserContext";

export default function Routes() {
  const { username, id } = useContext(UserContext);
  console.log(id)
  if (username) {
    return 'logging in';
  }
  return (
    <Register />
  )
}