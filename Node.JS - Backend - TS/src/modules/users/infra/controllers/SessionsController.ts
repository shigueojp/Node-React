import AuthenticatedUserService from '@modules/users/services/AuthenticatedUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SessionsController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const authenticateUser = container.resolve(AuthenticatedUserService);

    const { user, token } = await authenticateUser.execute({ email, password });

    return res.json({ user, token });
  }
}
