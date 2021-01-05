import 'reflect-metadata';
import { ApolloServer, ApolloError, AuthenticationError } from 'apollo-server';
import { buildSchema } from 'type-graphql';

import Resolvers from './modules';
import config from './config';

(async function initApp() {
  const schema = await buildSchema({
    resolvers: Resolvers
  })
  
  const app = new ApolloServer({
    schema,
    context: ({ req: request, res: response }) => ({ request, response }),
    formatError: (error) => {
      // Temos que lidar com erros do Servidor,
      // Esses erros pode conter informações sensíveis,
      // como por exemplo credenciais da nossa base de dados.
      if (error.originalError instanceof AuthenticationError) {
        return {
          message: error.message,
          code: error.extensions?.code
        }
      }
      
      if (error.originalError instanceof ApolloError) {
        return {
          message: error.message,
          code: error.extensions?.code
        }
      }

      console.log(error)

      return {
        message: 'Internal Server Error',
        code: 'INTERNAL_SERVER_ERROR'
      };
    }
  });
  
  const { port } = config.server;

  app.listen(port)
    .then(({ url }) => console.log(`server is running on ${url}`))
    .catch((error) => console.log(error));
}());