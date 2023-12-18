import { Session, User } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from 'next-auth/providers/credentials';
import { authOption } from "./authOption";
const handleAuth = NextAuth(authOption);

export { handleAuth as POST, handleAuth as GET }