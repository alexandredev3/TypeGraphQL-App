import { MiddlewareFn } from 'type-graphql';
import { AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';

import AuthenticationContext from '../context/authenticationContext';

import config from '../../../config';

interface IDecoded {
  id: string;
}

const extractToken = (context: AuthenticationContext) => {
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

const ensureAuthentication: MiddlewareFn<AuthenticationContext> = async ({ context }, next) => {
  const token = extractToken(context);

  return verify(token)
    .then((decoded) => {
      context.payload = decoded;

      return next();
    })
    .catch(() => {
      throw new AuthenticationError('Invalid authentication token');
    });
}

export default ensureAuthentication;
