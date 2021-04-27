import { DbLoadAccountByEmail } from '@/data/usecases'
import { LoadAccountByEmailRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: DbLoadAccountByEmail
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const sut = new DbLoadAccountByEmail(loadAccountByEmailRepositorySpy)
  return {
    sut,
    loadAccountByEmailRepositorySpy
  }
}

let email: string

describe('DbLoadAccountByEmail Usecase', () => {
  beforeEach(() => {
    email = faker.internet.email()
  })

  test('Should call LoadAccountByEmailRepository with correct values', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    await sut.loadByEmail(email)
    expect(loadAccountByEmailRepositorySpy.email).toBe(email)
  })

  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    loadAccountByEmailRepositorySpy.result = null
    const account = await sut.loadByEmail(email)
    expect(account).toBeNull()
  })

  test('Should return an account on success', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const account = await sut.loadByEmail(email)
    expect(account).toEqual(loadAccountByEmailRepositorySpy.result)
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    jest
      .spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail')
      .mockImplementationOnce(throwError)
    const promise = sut.loadByEmail(email)
    await expect(promise).rejects.toThrow()
  })
})
