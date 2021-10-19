import { Request, Response } from 'express';
import { AuthenticateUseService } from '../services/AuthenticateUserService';

export class AuthenticateUserController {
	async handle(request: Request, response: Response) {
		const { code } = request.body;
		try {
			const service = new AuthenticateUseService();
			const { token, user } = await service.execute(code);

			return response.json({ token, user });
		} catch (error) {
			return response.json({ error: error.message });
		}
	}
}
