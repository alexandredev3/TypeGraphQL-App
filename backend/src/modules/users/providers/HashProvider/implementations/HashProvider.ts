import { compare, hash } from 'bcryptjs';

import IHashProvider from '../models/IHashProvider';

class HashProvider implements IHashProvider {
  public async generateHash(payload: string) {
    const passwordHash = await hash(payload, 8);

    return passwordHash;
  }

  public async compareHash(payload: string, hash: string) {
    const compareHash = await compare(payload, hash);

    return compareHash;
  }
}

export default HashProvider;