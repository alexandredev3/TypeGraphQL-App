import { NonEmptyArray } from 'type-graphql';

import UserResolvers from './users/resolvers/UserResolvers';
import SessionResolvers from './users/resolvers/SessionResolvers';

const Resolvers: NonEmptyArray<Function> = [
  UserResolvers,
  SessionResolvers 
]

export default Resolvers