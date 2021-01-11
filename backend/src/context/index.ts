import { ExpressContext } from 'apollo-server-express/src/ApolloServer';
import { ContextFunction } from 'apollo-server-core';
import { PrismaClient } from '@prisma/client';

interface ApolloContext extends ExpressContext {
  prisma: PrismaClient
}

const contextHandle: ContextFunction<ApolloContext> = ({ 
  req: request,
  res: response,
  prisma
}) => {

  return {
    request,
    response,
    prisma
  }
}

export default contextHandle;