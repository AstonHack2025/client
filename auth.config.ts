import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { UserProvider } from "@/lib/models/types";
import { SignInValidation } from "@/lib/validations/auth";
import { fetchUserByEmail, fetchUserById, signInWithOauth } from "@/lib/api-handler/user";
import { fetchConfirmationByUserId, deleteConfirmationById } from "@/lib/api-handler/twofac";

export default {
    session: { strategy: "jwt" },
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/signin", // app/signin
        error: "/error", // app/error
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = SignInValidation.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;
                    let existingUser = await fetchUserByEmail(email);
                    if (!existingUser || !existingUser.password) return null;
                    const passwordsMatch = await bcrypt.compare(password, existingUser.password);
                    existingUser.password = "";
                    if (passwordsMatch) return existingUser;
                }

                return null;
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account && account?.provider !== UserProvider.CREDENTIALS && profile) {
                return await signInWithOauth({ account, profile });
            }

            if (account?.provider === UserProvider.CREDENTIALS && user._id) {
                const existingUser = await fetchUserById(user._id);
                if (!existingUser?.emailVerified) return false;
                if (existingUser?.isTwoFactorEnabled) {
                    const twoFactorConfirmation = await fetchConfirmationByUserId(existingUser._id);
                    if (!twoFactorConfirmation) return false;
                    await deleteConfirmationById(twoFactorConfirmation._id);
                }
            }

            return true;
        },
        async jwt({ token }) {
            if (!token.email) return token;
            const existingUser = await fetchUserByEmail(token.email);
            if (!existingUser) return token;
            token._id = existingUser._id;
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.provider = existingUser.provider;
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
            return token;
        },
        async session({ session, token }) {
            if (token._id && session.user) {
                if (!token.email) return session;
                const user = await fetchUserByEmail(token.email);
                if (!user) return session;
                session.user._id = token._id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.provider = token.provider as UserProvider;
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
                session.user.coursesStatus = user.coursesStatus;
            }

            return session;
        },
    },
} satisfies NextAuthConfig;
