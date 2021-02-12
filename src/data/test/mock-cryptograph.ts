import { Hasher, HashComparer, Encrypter, Decrypter } from '@/data/protocols/cryptography'

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(value: string): Promise<string> {
      return new Promise((resolve) => resolve('any_password'))
    }
  }
  return new HasherStub()
}

export const mockHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare(value: string, hash: string): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new HashComparerStub()
}

export const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(id: string): Promise<string> {
      return Promise.resolve('any_token')
    }
  }
  return new EncrypterStub()
}

export const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt(value: string): Promise<string> {
      return 'any_value'
    }
  }
  return new DecrypterStub()
}
