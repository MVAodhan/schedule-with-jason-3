import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { chaptersValidator } from "@/lib/zod";
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

export async function POST(request: Request) {
	const body = await request.json();
	let results = chaptersValidator.safeParse(body);
	if (!results.success) {
		return NextResponse.json({ message: "Insufficient data" });
	} else {
		let updated = await prisma.episode.update({
			where: {
				id: results.data.episodeId,
			},
			data: {
				chapters: results.data.chapters,
			},
		});
		return NextResponse.json(updated);
	}
}
