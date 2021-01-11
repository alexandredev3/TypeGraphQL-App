import { NonEmptyArray } from 'type-graphql';

import UserResolver from './users/resolvers/user.resolver';
import SessionResolver from './users/resolvers/session.resolver';
import PostResolver from './posts/resolvers/post.resolver';

const Resolvers: NonEmptyArray<Function> = [
  UserResolver,
  SessionResolver,
  PostResolver
]

export default Resolvers