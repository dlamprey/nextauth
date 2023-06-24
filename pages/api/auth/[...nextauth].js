import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { clientPromise } from '../../../lib/mongodb-client';
import { sendUserVerificationEmail } from '../../../lib/sendgrid';
import NextAuth from 'next-auth';

const emailHost = 'smtp.sendgrid.net';
const emailUsername = 'apikey';
const emailPassword = process.env.SENDGRID_API_KEY;

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: '/auth/sign-in',
    verifyRequest: '/auth/email-sent',
  },
  events: {
  },
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user && user) {
        session.user.id = user.id || null;
        session.user.firstName = user?.firstName || null;
        session.user.profileImageUrl = user.profileImageUrl || null;
        session.user.webPreferences = user.webPreferences || {};
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Sign in with passwordless email link
    EmailProvider({
      server: `smtp://${emailUsername}:${emailPassword}@${emailHost}:587`,
      from: process.env.MAIL_FROM,
      maxAge: 365 * 24 * 60 * 60, // 1 year
      sendVerificationRequest: async ({ identifier: email, url }) => {
        await sendUserVerificationEmail(email, url);
      },
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
