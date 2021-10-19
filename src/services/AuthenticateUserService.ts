import axios from 'axios';
import prismaClient from '../prisma';
import { sign } from 'jsonwebtoken';

interface IAccessTokenResponse {
	access_token: string;
	error_description?: string;
	error_uri?: string;
}
interface IUserResponse {
	login: string;
	id: number;
	avatar_url: string;
	name: string;
}
export class AuthenticateUseService {
	async execute(code: string) {
		const url = 'https://github.com/login/oauth/access_token';

		const { data: accessTokenResponse } =
			await axios.post<IAccessTokenResponse>(url, null, {
				params: {
					client_id: process.env.GITHUB_CLIENT_ID,
					client_secret: process.env.GITHUB_CLIENT_SECRET,
					code,
				},
				headers: {
					Accept: 'application/json',
				},
			});

		const authorization = `Bearer ${accessTokenResponse.access_token}`;

		const response = await axios.get<IUserResponse>(
			'https://api.github.com/user',
			{
				headers: {
					authorization,
				},
			}
		);

		const { avatar_url, id, login, name } = response.data;

		let user = await prismaClient.user.findFirst({
			where: {
				github_id: id,
			},
		});

		if (!user) {
			user = await prismaClient.user.create({
				data: {
					avatar_url,
					name,
					github_id: id,
					login,
				},
			});
		} else {
			await prismaClient.user.update({
				data: {
					avatar_url,
					github_id: id,
					login,
					name,
				},
				where: {
					id: user.id,
				},
			});
		}

		const token = sign(
			{
				user: {
					id: user.id,
					name: user.name,
					avatar_url,
				},
			},
			process.env.SECRET_JWT,
			{
				subject: user.id,
				expiresIn: '2 days',
			}
		);

		return { token, user };
	}
}
