import { useEffect } from "react";
import { signIn } from "next-auth/react";

export default function SignIn() {
  useEffect(() => {
    signIn("keycloak", { callbackUrl: "/" });
  }, []);

  return <div>Redirecting to login...</div>;
}
