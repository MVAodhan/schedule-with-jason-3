import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { updateValidator } from "@/lib/types/schedma";
import { json } from "stream/consumers";

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
	let results = updateValidator.safeParse(body);
	if (!results.success) {
		prisma.$disconnect();
		return NextResponse.json({ message: "Insufficient data" });
	}
	switch (results.data.type) {
		case "chapters":
			await prisma.episode.update({
				where: {
					id: results.data.episodeId,
				},
				data: {
					chapters: results.data.chapters,
				},
			});
			prisma.$disconnect();
			return NextResponse.json({ message: "Chapters updated" });
		case "links":
			await prisma.episode.update({
				where: {
					id: results.data.episodeId,
				},
				data: {
					links: results.data.links,
					demo: results.data.demo,
					repo: results.data.repo,
				},
			});
			prisma.$disconnect();
			return NextResponse.json({ message: "Links updated" });
	}
}
