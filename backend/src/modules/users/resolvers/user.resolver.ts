import { Resolver, Query, Mutation, Arg, Authorized, Ctx } from 'type-graphql';
import { PrismaClient } from '@prisma/client';
import { ApolloError } from 'apollo-server';

import HashProvider from '../providers/HashProvider/implementations/HashProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import UserInput from '../inputs/user-input';

import User from '../types/user-type';
import GraphqlContext from '../../../context/GraphqlContext';

@Resolver(User)
class UserResolvers {
  private hashProvider: IHashProvider;

  constructor() {
    this.hashProvider = new HashProvider();
  }

  @Query(() => [User])
  @Authorized()
  async users(
    @Ctx() { prisma }: GraphqlContext
  ) {
    const users = await prisma.user.findMany();

    return users;
  }

  @Query(() => User)
  @Authorized()
  async user(
    @Arg('user_id') user_id: string,
    @Ctx() { prisma }: GraphqlContext
  ) {
    const user = await prisma.user.findUnique({
      where: {
        id: user_id
      }
    });

    return user;
  }

  @Mutation(() => User)
  async createUser(
    @Arg('userInput', { validate: true }) userArgs: UserInput,
    @Ctx() { prisma }: GraphqlContext
  ) {
    const { name, email, password, bio } = userArgs;

    const userExists = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (userExists) {
      throw new ApolloError('User already exists.', 'CONFLICT');
    }

    const passwordHash = await this.hashProvider.generateHash(password);

    const user = await prisma.user.create({
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