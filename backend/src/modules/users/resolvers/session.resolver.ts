import { Mutation, Arg } from 'type-graphql';
import { PrismaClient } from '@prisma/client';
import { AuthenticationError } from 'apollo-server';
import { sign } from 'jsonwebtoken';

import config from '../../../config';

import HashProvider from '../providers/HashProvider/implementations/HashProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import Session from '../types/session-type';
import SessionInput from '../inputs/session-input';

class SessionResolvers {
  private prismaService: PrismaClient;
  private hashProvider: IHashProvider;

  constructor() {
    this.prismaService = new PrismaClient();
    this.hashProvider = new HashProvider();
  }

  @Mutation(() => Session)
  async Session(
    @Arg('sessionInput') sessionInput: SessionInput,
  ) {
    const { email, password } = sessionInput;

    const user = await this.prismaService.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new AuthenticationError('User does not exists.');
    }

    const passwordCompare = await this.hashProvider.compareHash(
      password, user.password
    );

    if (!passwordCompare) {
      throw new AuthenticationError('Password does not match.');
    }

    const { private_key, options } = config.auth;

    const { id, name } = user;

    const token = sign({ id }, private_key, options);

    return {
      id,
      name,
      token
    }
  }
}

export default SessionResolvers
