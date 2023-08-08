// import { PrismaClient } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	// const prisma = new PrismaClient();
	const body = await request.json();

	const numberId = Number(body.id);
	const deleted = await prisma.schedule.delete({
		where: { id: numberId },
	});

	prisma.$disconnect();
	return new NextResponse(
		JSON.stringify({ message: "Item deleted successfully" }),
		{ status: 200 }
	);
}
