import { Resolver, Query, Mutation, Arg, UseMiddleware, Ctx } from 'type-graphql';
import { PrismaClient } from '@prisma/client';
import { ApolloError } from 'apollo-server';

import HashProvider from '../providers/HashProvider/implementations/HashProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import UserInputType from '../types/UserTypes';

import User from '../models/User';

import AuthenticationContext from '../context/authenticationContext';
import ensureAuthentication from '../middleware/ensureAuthentication';

@Resolver(User)
class UserResolvers {
  private prismaService: PrismaClient;
  private hashProvider: IHashProvider;

  constructor() {
    this.prismaService = new PrismaClient();
    this.hashProvider = new HashProvider();
  }

  @Query(() => [User])
  @UseMiddleware(ensureAuthentication)
  async users() {
    const users = await this.prismaService.user.findMany();

    return users;
  }

  @Query(() => User)
  @UseMiddleware(ensureAuthentication)
  async user(
    @Arg('user_id') user_id: string
  ) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: user_id
      }
    });

    return user;
  }

  @Mutation(() => User)
  async createUser(
    @Arg('userInput') userInput: UserInputType
  ) {
    const { name, email, password, bio } = userInput;

    const userExists = await this.prismaService.user.findUnique({
      where: {
        email
      }
    });

    if (userExists) {
      throw new ApolloError('User already exists.', 'CONFLICT');
    }

    const passwordHash = await this.hashProvider.generateHash(password);

    const user = await this.prismaService.user.create({
      data: {
        name,
        email,
        bio,
        password: passwordHash,
      }
    });

    const { id } = user;

    return {
      id,
      name
    }
  }
}

export default UserResolvers;