import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const prisma = new PrismaClient();
	const body = await request.json();

	console.log(body);
	const numberId = Number(body.payload.episodeId);
	const deleted = await prisma.episode.delete({
		where: { id: numberId },
	});

	prisma.$disconnect();
	return new NextResponse(
		JSON.stringify({ message: "Item deleted successfully" }),
		{ status: 200 }
	);
}
