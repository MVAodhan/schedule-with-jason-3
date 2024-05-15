import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest, res : NextResponse){

    const body = await req.json()
			await prisma.episode.update({
				where: {
					id: body.id
				},
				data: {
                    date: '',
					yt_live_link : '',
					schedule_tweet : false,
					ninety_minute_tweet: false,
					live_tweet: false,
					discord_event: false
				},
			});
	prisma.$disconnect();
    return NextResponse.json({
        message: 'successful reset '
    })
}