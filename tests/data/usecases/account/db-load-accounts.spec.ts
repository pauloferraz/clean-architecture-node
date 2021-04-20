import { DbLoadAccounts } from '@/data/usecases'
import { LoadAccountsRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: DbLoadAccounts
  loadAccountsRepositorySpy: LoadAccountsRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountsRepositorySpy = new LoadAccountsRepositorySpy()
  const sut = new DbLoadAccounts(loadAccountsRepositorySpy)
  return {
    sut,
    loadAccountsRepositorySpy
  }
}

let role: string

describe('DbLoadAccounts Usecase', () => {
  beforeEach(() => {
    role = faker.random.word()
  })

  test('Should call LoadAccountsRepository with correct values', async () => {
    const { sut, loadAccountsRepositorySpy } = makeSut()
    await sut.loadAccounts(role)
    expect(loadAccountsRepositorySpy.role).toBe(role)
  })

  test('Should return null if LoadAccountsRepository returns null', async () => {
    const { sut, loadAccountsRepositorySpy } = makeSut()
    loadAccountsRepositorySpy.result = null
    const account = await sut.loadAccounts(role)
    expect(account).toBeNull()
  })
  test('Should return accounts on success', async () => {
    const { sut, loadAccountsRepositorySpy } = makeSut()
    const account = await sut.loadAccounts(role)
    expect(account).toEqual(loadAccountsRepositorySpy.result)
  })

  test('Should throw if LoadAccountsRepository throws', async () => {
    const { sut, loadAccountsRepositorySpy } = makeSut()
    jest
      .spyOn(loadAccountsRepositorySpy, 'loadAccounts')
      .mockImplementationOnce(throwError)
    const promise = sut.loadAccounts(role)
    await expect(promise).rejects.toThrow()
  })
})
