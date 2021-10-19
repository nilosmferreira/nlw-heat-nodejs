import { Request, Response } from 'express';
import { ProfileUserService } from '../services/ProfileUserService';
export class ProfileController {
	async handle(request: Request, response: Response) {
		const { user_id } = request;
		try {
			const service = new ProfileUserService();
			const result = await service.execute(user_id);
			return response.json(result);
		} catch (error) {
			return response.status(500).json({ message: error.message });
		}
	}
}
