import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
	let episodes = await prisma.schedule.findMany();

	prisma.$disconnect();
	return NextResponse.json(episodes);
}

export async function POST(request: Request) {
	const body = await request.json();
	const scheduled = await prisma.schedule.create({
		data: {
			guest_name: body.guest,
			description: body.description,
			date: body.date,
			guest_twitter: body.guest_twitter,
			title: body.title,
			twitter_description: body.twitter_description,
		},
	});
	prisma.$disconnect();
	return NextResponse.json(scheduled);
}
