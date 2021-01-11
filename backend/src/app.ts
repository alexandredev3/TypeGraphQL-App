import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema} from 'type-graphql';
import { PrismaClient } from '@prisma/client';

import ensureAuthentication from './middlewares/ensureAuthentication';
import exceptionHandle from './errors/exceptionHandle';
import contextHandle from './context';
import Resolvers from './modules';
import config from './config';

(async function initApp() {
  const schema = await buildSchema({
    resolvers: Resolvers,
    validate: true,
    authChecker: ensureAuthentication
  })
  
  const prisma = new PrismaClient();

  const app = new ApolloServer({
    schema,
    context: ({ req, res }) => contextHandle({ req, res, prisma }),
    formatError: (error) => exceptionHandle(error)
  });
  
  const { port } = config.server;

  app.listen(port)
    .then(({ url }) => console.log(`server is running on ${url}`))
    .catch((error) => console.log(error));
}());