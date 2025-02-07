import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

const CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID;
const CLIENT_SECRET = process.env.KEYCLOAK_CLIENT_SECRET;
const ISSUER = process.env.KEYCLOAK_ISSUER;

if (!CLIENT_ID || !CLIENT_SECRET || !ISSUER) {
  throw new Error(
    "KeyCloak client is not defined in the environment variables"
  );
}

export default NextAuth({
  providers: [
    KeycloakProvider({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      issuer: ISSUER,
    }),
  ],
  callbacks: {
    async signIn({}) {
      return true;
    },
  },
});
