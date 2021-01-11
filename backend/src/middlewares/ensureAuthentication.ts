import { AuthChecker } from 'type-graphql';
import { AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';

import GraphqlContext from '../context/GraphqlContext';

import config from '..//config';

interface IDecoded {
  id: string;
}

const extractToken = (context: GraphqlContext) => {
  const authorization = context.request.headers.authorization || '';

  const token = authorization.replace('Bearer ', '');

  return token;
}

const verify = (token: string): Promise<IDecoded> => new Promise((resolve, reject) => {
  const { public_key } = config.auth;

  const decoded = jwt.verify(token, public_key, (error, data) => {
    if (error) {
      return reject(error);
    }

    return data;
  });

  return resolve(decoded as unknown as IDecoded);
});

const authChecker: AuthChecker<GraphqlContext> = async ({ context }) => {
  const token = extractToken(context);

  return verify(token)
    .then((decoded) => {
      context.payload = decoded;

      return true
    })
    .catch(() => {
      false
      throw new AuthenticationError('Invalid authentication token');
    });
}

export default authChecker;