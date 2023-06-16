import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
export async function GET(request: Request) {
	// const prisma = new PrismaClient();
	const episodes = await prisma.episode.findMany({
		orderBy: {
			date: "asc",
		},
	});
	prisma.$disconnect();

	return NextResponse.json(episodes);
}
