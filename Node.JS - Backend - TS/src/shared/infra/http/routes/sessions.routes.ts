import { Router } from 'express';
import AuthenticatedUserService from '@modules/users/services/AuthenticatedUserService';
import { container } from 'tsyringe';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  const authenticateUser = container.resolve(AuthenticatedUserService);

  const { user, token } = await authenticateUser.execute({ email, password });

  return res.json({ user, token });
});

export default sessionsRouter;
