import AuthenticatedUserService from '@modules/users/services/AuthenticatedUserService';
import CreateUserServices from '@modules/users/services/CreateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UsersController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUser = container.resolve(CreateUserServices);
    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return res.json(user);
  }
}
