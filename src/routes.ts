import { Request, Response, Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateMessageController } from './controllers/CreateMessageController';
import { GetLast3MessagesController } from './controllers/GetLast3MessagesController';
import { GetLastMessagesController } from './controllers/GetLastMessagesController';
import { ProfileController } from './controllers/ProfileUserController';
import { ensureAuthenticated } from './middleware/ensureAuthenticated';

const router = Router();

router.post('/authenticate', new AuthenticateUserController().handle);
router.post(
	'/messages',
	ensureAuthenticated,
	new CreateMessageController().handle
);
router.get('/messages/last3', new GetLast3MessagesController().handle);
router.get('/messages/:take', new GetLastMessagesController().handle);

router.get('/profile', ensureAuthenticated, new ProfileController().handle);
export { router };
