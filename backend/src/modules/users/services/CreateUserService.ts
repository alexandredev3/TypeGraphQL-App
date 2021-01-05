import { ApolloError } from 'apollo-server';

import UserRepository from '../repositories/implementations/UserRepository';
import IUserRepository from '../repositories/models/IUserRepository';

import HashProvider from '../providers/HashProvider/implementations/HashProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
  bio: string;
}

interface IResponse {
  id: string;
  name: string;
}

class CreateUserService {
  private userRepository: IUserRepository;
  private hashProvider: IHashProvider;

  constructor() {
    this.userRepository = new UserRepository();
    this.hashProvider = new HashProvider();
  }

  public async execute({
    name, bio, email, password
  }: IRequest): Promise<IResponse> {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new ApolloError('User already exists.', 'CONFLICT');
    }

    const passwordHash = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      bio,
      password: passwordHash,
    });

    const { id } = user;

    return {
      id,
      name
    }
  }
}

export default CreateUserService;