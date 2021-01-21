import { Encrypter } from '../../data/protocols/encrypter'
import bcripty from 'bcrypt'

export class BcryptAdapter implements Encrypter {
  private readonly salt: number

  constructor(salt: number) {
    this.salt = salt
  }

  async encrypt(value: string): Promise<string> {
    const hash = await bcripty.hash(value, this.salt)
    return hash
  }
}