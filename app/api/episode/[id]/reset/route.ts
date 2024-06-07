import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest, res : NextResponse){

    const body = await req.json()
			await prisma.episode.update({
				where: {
					id: body.id
				},
				data: {
                    date: "2024-01-01T17:00:00Z",
					yt_live_link : '',
					schedule_tweet : false,
					ninety_minute_tweet: false,
					live_tweet: false,
					discord_event: false,
					website: false,
					calendar_event: false
				},
			});
	prisma.$disconnect();
    return NextResponse.json({
        message: 'successful reset '
    })
}