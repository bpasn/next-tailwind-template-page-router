import axios from 'axios';
import { NextAuthOptions, Session, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
export const authOption: NextAuthOptions = ({
    callbacks: {
        session: ({ user, session }: { user: User, session: Session }) => {
            return session
        },
        jwt: ({ token }) => {
            return token;
        }
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", placeholder: "Enter your email" },
                password: { label: "Password", placeholder: "Enter your password", type: "password" },
            },
            authorize: async (credentials) => {
                const result = await axios.post(process.env.APP_API?.concat("/api/v1/auth/authentication")!, credentials);
                if (result.data && result.data.token) {
                    return result.data.token;
                }
                throw Error("Something went wrong!!");
            }
        })
    ]
});
