import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const prisma = new PrismaClient();

const options = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
	],
	callbacks: {
		session({ session, user }: { session: any; user: any }) {
			session.user.role = user.role;
			return session;
		},
	},
};

const AuthFunction = (req: NextApiRequest, res: NextApiResponse) =>
	NextAuth(req, res, options);

export default AuthFunction;
