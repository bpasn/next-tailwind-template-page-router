import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';
declare module "next-auth" {
    interface User extends DefaultUser {

    }
    interface Session {
        user: User & DefaultSession['user'];
        token?: string;

    }

}

declare module "next-auth/jwt" {
    interface JWT {
        exp?: number;
        lat?: number;
        token?: number;
    }
}