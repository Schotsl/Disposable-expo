import React from "react";

import { getAuth, onAuthStateChanged, User } from "firebase/auth";

const auth = getAuth();

export function useAuthentication() {
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    return onAuthStateChanged(auth, (user) => setUser(user ?? undefined));
  });

  return {
    user,
  };
}
