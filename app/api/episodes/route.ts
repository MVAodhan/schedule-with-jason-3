import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(request: Request) {
	const episodes = await prisma.episode.findMany({
		orderBy: {
			date: "asc",
		},
	});
	prisma.$disconnect();

	return NextResponse.json(episodes);
}


