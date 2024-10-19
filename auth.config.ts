import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import { authenticateJwt } from './app/(auth)/(signin)/actions';

const authConfig = {
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    }
  },
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/',
    verifyRequest: '/',
    newUser: '/dashboard'
  },
  providers: [
    CredentialProvider({
      credentials: {
        email: {
          type: 'email'
        },
        password: {
          type: 'password'
        }
      },
      async authorize(credentials) {
        const response = await authenticateJwt(
          credentials as { email: string; password: string }
        );
        if (response?.user) {
          return response.user;
        } else {
          return null;
        }
      }
    })
  ]
} satisfies NextAuthConfig;

export default authConfig;
