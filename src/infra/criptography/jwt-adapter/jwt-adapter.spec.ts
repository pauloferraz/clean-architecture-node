import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return new Promise((resolve) => resolve('any_token'))
  },

  async verify(): Promise<string> {
    return new Promise((resolve) => resolve('any_token'))
  }
}))

describe('JWT Adapter', () => {
  describe('sign()', () => {
    test('should call sign with correct values', async () => {
      const sut = new JwtAdapter('secret')
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_id')
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
    })

    test('should return a token on sign success', async () => {
      const sut = new JwtAdapter('secret')
      const accessToken = await sut.encrypt('any_id')
      expect(accessToken).toBe('any_token')
    })

    test('should throw if sign throws', async () => {
      const sut = new JwtAdapter('secret')
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.encrypt('any_id')
      await expect(promise).rejects.toThrow()
    })
  })
  describe('verify()', () => {
    test('should call verify with correct values', async () => {
      const sut = new JwtAdapter('secret')
      const verifySpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt('any_token')
      expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret')
    })

    test('should return a token on verify success', async () => {
      const sut = new JwtAdapter('secret')
      const value = await sut.decrypt('any_token')
      expect(value).toBe('any_token')
    })

    test('should throw if verify throws', async () => {
      const sut = new JwtAdapter('secret')
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.decrypt('any_token')
      await expect(promise).rejects.toThrow()
    })
  })
})
