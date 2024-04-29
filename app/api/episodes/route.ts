import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic' 

export async function GET(request: Request, res: NextResponse) {
	// const prisma = new PrismaClient();
	const episodes = await prisma.episode.findMany({
		orderBy: {
			date: "asc",
		},
	});
	prisma.$disconnect();

	return NextResponse.json(episodes);
}
