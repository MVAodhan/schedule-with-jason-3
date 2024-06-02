import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export async function POST(request: Request) {
	const body = await request.json();
	const saveTwitterDesc = await prisma.episode.update({
        where: { id: body.id },
        data: {
            twitter_description: body.twitter_description,
            schedule_tweet : body.schedule_tweet,
            ninety_minute_tweet : body.ninety_minute_tweet,
            live_tweet : body.live_tweet,
            yt_live_link: body.yt_live_link,
            website: body.website,
            calendar_event: body.calendar_event
        }
    })
	prisma.$disconnect();
	return NextResponse.json(saveTwitterDesc);
}
