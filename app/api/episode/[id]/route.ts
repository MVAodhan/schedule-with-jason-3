import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const episode = await prisma.episode.findFirst({
		where: {
			sanityId: params.id,
		},
	});
	prisma.$disconnect();
	return NextResponse.json(episode);
}
