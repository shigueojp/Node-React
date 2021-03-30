import { response, Router } from 'express';
import { container } from 'tsyringe';
import CreateUserServices from '@modules/users/services/CreateUserService';
import uploadConfig from '@config/upload';
import multer from 'multer';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import UsersController from '@modules/users/infra/controllers/UsersController';
import UserAvatarController from '@modules/users/infra/controllers/UserAvatarController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);
// usersRouter.get('/', async (req, res) => {
//   // const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//   // const appointments = await appointmentsRepository.find();
//   const usersRepository = new UsersRepository();
//   const users = await usersRepository.find();
//   return res.json(users);
// });

usersRouter.post('/', usersController.create);

// Colocar middleware em uma rota via Express
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
