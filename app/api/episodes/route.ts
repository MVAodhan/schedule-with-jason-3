import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, res: NextResponse) {

	res.headers.set('Cache-Control', 'no-store')
	// const prisma = new PrismaClient();
	const episodes = await prisma.episode.findMany({
		orderBy: {
			date: "asc",
		},
	});
	prisma.$disconnect();

	return NextResponse.json(episodes);
}
