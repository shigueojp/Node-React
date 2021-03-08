import { parseISO } from 'date-fns';
import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import User from '../models/User';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import CreateUserServices from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.get('/', async (req, res) => {
  // const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  // const appointments = await appointmentsRepository.find();

  const usersRepository = getRepository(User);
  const users = await usersRepository.find();
  return res.json(users);
});

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserServices();
    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default usersRouter;
