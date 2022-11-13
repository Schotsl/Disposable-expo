import React from "react";

import SignedIn from "./signedIn";
import SignedOut from "./signedOut";

import { useAuthentication } from "../utils/hooks/useAuthentication";

export default function RootNavigation() {
  const { user } = useAuthentication();

  return user ? <SignedIn /> : <SignedOut />;
}
