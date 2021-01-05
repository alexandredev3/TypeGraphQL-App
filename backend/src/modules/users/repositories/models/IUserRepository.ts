import UserInputType from '../../types/UserTypes';
import User from '../../models/User';

export default interface IUserRepository {
  create(data: UserInputType): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}