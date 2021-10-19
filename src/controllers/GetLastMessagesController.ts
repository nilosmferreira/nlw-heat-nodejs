import { Request, Response } from 'express';
import { GetLastMessagesService } from '../services/GetLastMessagesService';

export class GetLastMessagesController {
	async handle(request: Request, response: Response) {
		const { take } = request.params;
		const service = new GetLastMessagesService();
		const messages = await service.execute(+take);
		return response.json(messages);
	}
}
