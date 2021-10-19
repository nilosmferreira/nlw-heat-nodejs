import { Request, Response } from 'express';
import { CreateMessageService } from '../services/CreateMessageService';
export class CreateMessageController {
	async handle(request: Request, response: Response) {
		const { message } = request.body;
		const { user_id } = request;
		try {
			const service = new CreateMessageService();
			const messageReturned = await service.execute(message, user_id);
			return response.status(201).json(messageReturned);
		} catch (error) {
			return response.status(500).json({ message: error.message });
		}
	}
}
