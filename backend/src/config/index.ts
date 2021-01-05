import { SignOptions } from 'jsonwebtoken';

import auth from './auth';
import server from './server';

interface IConfig {
  auth: {
    private_key: string;
    public_key: string;
    options: SignOptions
  }
  server: {
    port: number;
  }
}

export default {
  auth,
  server
} as unknown as IConfig