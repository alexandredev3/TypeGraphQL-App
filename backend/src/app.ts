import 'reflect-metadata';
import { ApolloServer, ApolloError } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { UserResolvers } from './modules'

(async function initApp() {
  const schema = await buildSchema({
    resolvers: [UserResolvers]
  })
  
  const app = new ApolloServer({ 
    schema,
    formatError: (error) => {
      // Temos que lidar com erros do Servidor,
      // Esses erros pode conter informações sensíveis,
      // como por exemplo credenciais da nossa base de dados.
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
  
  app.listen(3333)
    .then(({ url }) => console.log(`server is running on ${url}`))
    .catch((error) => console.log(error));
}());