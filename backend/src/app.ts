import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema} from 'type-graphql';

import ensureAuthentication from './middlewares/ensureAuthentication';
import exceptionHandle from './errors/exceptionHandle';

import Resolvers from './modules';

import config from './config';

(async function initApp() {
  const schema = await buildSchema({
    resolvers: Resolvers,
    validate: true,
    authChecker: ensureAuthentication
  })
  
  const app = new ApolloServer({
    schema,
    context: ({ req: request, res: response }) => ({ 
      request, response 
    }),
    formatError: (error) => exceptionHandle(error)
  });
  
  const { port } = config.server;

  app.listen(port)
    .then(({ url }) => console.log(`server is running on ${url}`))
    .catch((error) => console.log(error));
}());