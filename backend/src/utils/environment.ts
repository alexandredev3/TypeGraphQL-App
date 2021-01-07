import * as dotenv from 'dotenv';

dotenv.config();

export const {
  NODE_ENV
} = process.env;

export const { 
  PUBLIC_KEY,
  PRIVATE_KEY
} = process.env;