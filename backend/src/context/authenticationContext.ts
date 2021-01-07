import { Request, Response } from 'express';

export default interface AuthenticationContext {
  request: Request;
  response: Response;
  payload: {
    id: string;
  }
}