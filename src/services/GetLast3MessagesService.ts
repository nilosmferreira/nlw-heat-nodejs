import prismaClient from '../prisma';

export class GetLast3MessagesService {
	async execute() {
		const results = await prismaClient.message.findMany({
			take: 3,
			include: {
				user: true,
			},
			orderBy: {
				created_at: 'desc',
			},
		});

		return results;
	}
}
