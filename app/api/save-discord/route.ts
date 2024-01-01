import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export async function POST(request: Request) {
	const body = await request.json();
	const saveTwitterDesc = await prisma.episode.update({
        where: { id: body.id },
        data: {
            discord_event: body.discord_event
        }
    })
	prisma.$disconnect();
	return NextResponse.json(saveTwitterDesc);
}
