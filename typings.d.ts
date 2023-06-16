// typings.d.ts
declare interface Date {
	toTemporalInstant: () => void; // Replace 'void' with the correct return type if necessary
}

interface Guest {
	twitter: string;
	image: string;
	name: string;
}

declare global {
	namespace NodeJS {
		interface Global {
			prisma: PrismaClient;
		}
	}
}
