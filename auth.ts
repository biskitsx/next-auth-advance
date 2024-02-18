import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter} from '@auth/prisma-adapter'
import { db } from "@/lib/db"
import { getUserById } from "./data/user"
import { UserRole } from "@prisma/client"

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  pages:{
    signIn: "/auth/login",
    error: "/auth/error"
  },
  events:{
    linkAccount:async ({user}) => {
      await db.user.update({
        where: {id: user.id},
        data: {emailVerified: new Date()}
      })
    }
  },
  adapter: PrismaAdapter(db),
  session: {strategy: "jwt"},
  ...authConfig,
  callbacks:{
    async signIn({user, account}) {
      console.log({user, account})
      // alow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      if (!user.id) return false
      
      // prevent sign in without email verification
      const existingUser = await getUserById(user.id)
      if (!existingUser?.emailVerified) {
        console.log("FUCK OFF")
        return false
      }

      // TODO: ADD 2FA check

      return true
    },
    async jwt({token}) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) {
        return token
      }

      token.role = existingUser.role
      return token;
    },

    async session({session, token}) {
      console.log({
        session,
        token
      })
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }
      return session
    }
  }
})