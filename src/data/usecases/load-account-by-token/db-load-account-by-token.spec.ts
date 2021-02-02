import { AccountModel } from '../../../domain/models/account'
import { Decrypter } from '../../protocols/cryptography/decrypter'
import { LoadAccountByTokenRepository } from '../../protocols/db/account/load-account-by-token-repository'
import { DbLoadAccountByToken } from './db-load-account-by-token'

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt(value: string): Promise<string> {
      return 'any_value'
    }
  }
  return new DecrypterStub()
}

const makeFakeAccount = (): AccountModel => ({
  id: '_id',
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'hashed_password'
})

const makeLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken(accessToken: string, role?: string): Promise<AccountModel> {
      return new Promise((resolve) => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

interface SutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter()
  const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepository()
  const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByTokenRepositoryStub)
  return { sut, decrypterStub, loadAccountByTokenRepositoryStub }
}

describe('LoadAccountByToken', () => {
  test('should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decrypterSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token')
    expect(decrypterSpy).toHaveBeenCalledWith('any_token')
  })

  test('should return null with Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(null)
    const account = await sut.load('any_token')
    expect(account).toBeNull()
  })

  test('should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const loadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
    await sut.load('any_token', 'any_role')
    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role')
  })

  test('Should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(null)
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.load('any_token', 'any_role')
    expect(account).toEqual(makeFakeAccount())
  })

  test('Should throw if Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockRejectedValueOnce(new Error())
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })
})
