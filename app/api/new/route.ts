import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();



export async function POST(request: Request) {
	const body = await request.json();
	await prisma.episode.create({
		data: {
            sanityId: body.sanityId,
			guest: {
                name: body.guest.name,
                image: "",
                twitter : body.guest.twitter
            },
			twitter : body.guest.twitter,
			name : body.guest.name,
			description: body.description,
			date: body.date,
			title: body.title,
			twitter_description: body.twitter_description,
            tags: body.tags,
            slug: body.slug,
            uri: body.uri,
		},
	});
	prisma.$disconnect();
	return NextResponse.json({message: 'ok'});
}
