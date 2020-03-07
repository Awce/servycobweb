import { useState, useEffect } from "react";
import {} from "../services/firebase";

const useAuthentication = () => {
  const [getUser, saveUser] = useState(null);

  useEffect(() => {
    if (user) {
      saveUser(user);
    } else {
      saveUser(null);
    }
    return () => {};
  }, []);

  return getUser;
};

export default useAuthentication;
