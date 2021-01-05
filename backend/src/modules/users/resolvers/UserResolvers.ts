import { Resolver, Query, Mutation, Arg } from 'type-graphql';

import UserInputType from '../types/UserTypes';

import User from '../models/User';

import CreateUserService from '../services/CreateUserService';

@Resolver(User)
class UserResolver {
  private createUserService: CreateUserService;

  constructor() {
    this.createUserService = new CreateUserService();
  }

  @Query(() => [User])
  async users() {
    // const users = await this.createUserService.findMany();

    // return users;
  }

  @Mutation(() => User)
  async createUser(
    @Arg('userInput') userInput: UserInputType
  ) {
    const { name, bio, email, password } = userInput;

    const user = await this.createUserService.execute({
      name,
      email,
      password,
      bio
    });

    return user;
  }
}

export default UserResolver;