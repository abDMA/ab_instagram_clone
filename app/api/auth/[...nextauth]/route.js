import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";


export const authOptions = {
  secret:process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId:process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
}),
  ],

  callbacks: {
    async jwt({ token, user, session }) {
     
     if (user) {
      return{
        ...token,
        id:user.id,
      }
     }
      return token
    },
    async session({ session, token, user }){
      return{
        ...session,
        user:{
          ...session.user,
          id:token.id,
        }
      };
      return session
    }
  },
 pages:{
  signIn:'/auth/signin'
 },
  secret:process.env.SECRET,
  

}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST}