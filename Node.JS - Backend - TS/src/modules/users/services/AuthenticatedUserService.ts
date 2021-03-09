import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import { container, inject, injectable } from 'tsyringe';
import authConfig from '../../../config/auth';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
class AuthenticatedUserService {
  @inject('UsersRepository')
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute({
    email,
    password,
  }: IRequest): Promise<{ user: User; token: string }> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    // user.password - Senha criptografada
    // password - Senha não criptografada
    // compare(password, passwordHashed)
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.');
    }

    const { secret, expiresIn } = authConfig.jwt;
    // HASH KEY
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticatedUserService;
