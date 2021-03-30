import { response, Router } from 'express';
import { container } from 'tsyringe';
import CreateUserServices from '@modules/users/services/CreateUserService';
import uploadConfig from '@config/upload';
import multer from 'multer';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);
// usersRouter.get('/', async (req, res) => {
//   // const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//   // const appointments = await appointmentsRepository.find();
//   const usersRepository = new UsersRepository();
//   const users = await usersRepository.find();
//   return res.json(users);
// });

usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const createUser = container.resolve(CreateUserServices);
  const user = await createUser.execute({ name, email, password });

  delete user.password;

  return res.json(user);
});

// Colocar middleware em uma rota via Express
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    });

    return res.json(user);
  },
);

export default usersRouter;
