import { Router } from 'express';
import { getRepository } from 'typeorm';
import { container } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import CreateUserServices from '@modules/users/services/CreateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const usersRouter = Router();

// usersRouter.get('/', async (req, res) => {
//   // const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//   // const appointments = await appointmentsRepository.find();
//   const usersRepository = new UsersRepository();
//   const users = await usersRepository.find();
//   return res.json(users);
// });

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = container.resolve(CreateUserServices);
    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default usersRouter;
