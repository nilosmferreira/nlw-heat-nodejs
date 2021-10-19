import prismaClient from '../prisma';

export class GetLastMessagesService {
	async execute(take: number) {
		const results = await prismaClient.message.findMany({
			take,
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
