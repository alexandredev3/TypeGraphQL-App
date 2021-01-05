import { PrismaClient } from '@prisma/client';

import IUserRepository from '../models/IUserRepository';

import User from '../../models/User';

import UserTypes from '../../types/UserTypes';

class UserRepository implements IUserRepository {
  private prismaService: PrismaClient;

  constructor() {
    this.prismaService = new PrismaClient();
  }

  public async create(data: UserTypes): Promise<User> {
    const user = await this.prismaService.user.create({
      data
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email
      }
    });

    return user;
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id
      }
    });

    return user;
  }
}

export default UserRepository;