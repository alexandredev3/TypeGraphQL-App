import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

export default interface GraphqlContext {
  request: Request;
  response: Response;
  prisma: PrismaClient;
  payload: {
    id: string;
  }
}