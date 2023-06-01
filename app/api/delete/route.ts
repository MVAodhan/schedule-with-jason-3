import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const prisma = new PrismaClient();
	const { id } = await request.json();
	const deleted = await prisma.schedule.delete({
		where: { id: id },
	});

	prisma.$disconnect();
	return new NextResponse(
		JSON.stringify({ message: "Item deleted successfully" }),
		{ status: 200 }
	);
}
