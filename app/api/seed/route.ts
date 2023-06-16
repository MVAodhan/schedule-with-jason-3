// import { PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// const prisma = new PrismaClient();
export async function GET() {
	// Get episodes from lwj api
	let res = await fetch("https://www.learnwithjason.dev/api/v2/schedule", {
		cache: "no-store",
	});
	const episodes = await res.json();
	// Gets all the episodes in the DB
	let episodesInDB = await prisma.episode.findMany();
	// Creates an array of all the sanityIds in the DB
	let sanittyIDsInDB = episodesInDB.map((episode: any) => episode.sanityId);

	const createEpisode = async (episode: any) => {
		await prisma.episode.create({
			data: {
				sanityId: episode.id,
				date: episode.date,
				description: episode.description,
				guest: {
					image: episode.guest.image,
					name: episode.guest.name,
					twitter: episode.guest.twitter,
				},
				host: {
					image: episode.host.image,
					name: episode.host.name,
					twitter: episode.host.twitter,
				},
				tags: JSON.stringify(episode.tags),
				slug: episode.slug,
				title: episode.title,
				uri: episode.uri,
			},
		});
	};

	let episodesToAdd = episodes.filter((episode: any) => {
		if (!sanittyIDsInDB.includes(episode.id)) {
			return episode;
		} else {
			return null;
		}
	});

	// // // For each of the episodes from the Sanity api, it checks if the sanityId is in the DB, if not, it adds it to the the DB
	episodesToAdd.forEach((episode: any) => {
		if (!sanittyIDsInDB.includes(episode.id)) {
			createEpisode(episode);
		}
	});

	prisma.$disconnect();

	return NextResponse.json({
		message: "success",
	});
}
