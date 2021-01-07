import { NonEmptyArray } from 'type-graphql';

import UserResolver from './users/resolvers/user.resolver';
import SessionResolver from './users/resolvers/session.resolver';

const Resolvers: NonEmptyArray<Function> = [
  UserResolver,
  SessionResolver 
]

export default Resolvers