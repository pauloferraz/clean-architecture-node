import { Hasher } from '../../data/protocols/cryptography/hasher'
import bcripty from 'bcrypt'

export class BcryptAdapter implements Hasher {
  private readonly salt: number

  constructor(salt: number) {
    this.salt = salt
  }

  async hash(value: string): Promise<string> {
    const hash = await bcripty.hash(value, this.salt)
    return hash
  }
}
