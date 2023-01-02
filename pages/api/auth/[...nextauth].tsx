import NextAuth, { NextAuthOptions } from "next-auth"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

export const authOptions: NextAuthOptions = {
  providers: [
    {
        idToken: true,
        id: "fhs",
        name: "fhs",
        type: "oauth",
        wellKnown: 'https://auth.projects.multimediatechnology.at/.well-known/openid-configuration',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,

        async profile(profile, token) {
          const response = await fetch("https://auth.projects.multimediatechnology.at/oauth/userinfo", {
            headers: { 'Authorization': `Bearer ${token.access_token}`},
          })

          const user = await response.json();

          return {
            id: profile.sub,
            name: `${user.given_name} ${user.family_name}`,
            email: user.email
          }
      }
    }
  ],
  pages: {
    signIn: "/"
  },
}

export default NextAuth(authOptions)