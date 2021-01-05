import { PRIVATE_KEY, PUBLIC_KEY } from '../utils/environment';

const options = {
  expiresIn: '3d',
  algorithm: 'RS256'
}

export default {
  private_key: PRIVATE_KEY,
  public_key: PUBLIC_KEY,
  options
}

