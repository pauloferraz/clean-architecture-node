import { LoadAccountsController } from '@/presentation/controllers'
import { ok, serverError, noContent } from '@/presentation/helpers'
import { LoadAccountsSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: LoadAccountsController
  loadAccountsSpy: LoadAccountsSpy
}

const makeSut = (): SutTypes => {
  const loadAccountsSpy = new LoadAccountsSpy()
  const sut = new LoadAccountsController(loadAccountsSpy)
  return {
    sut,
    loadAccountsSpy
  }
}

let role: string

describe('LoadAccountsController', () => {
  beforeAll(() => {
    role = faker.random.word()
  })

  test('Should call LoadAccounts', async () => {
    const { sut, loadAccountsSpy } = makeSut()
    await sut.handle({ role })
    expect(loadAccountsSpy.count).toBe(1)
  })

  test('Should return 200 on success', async () => {
    const { sut, loadAccountsSpy } = makeSut()
    const httpResponse = await sut.handle({ role })
    expect(httpResponse).toEqual(ok(loadAccountsSpy.result))
  })

  test('Should return 204 if LoadAccounts returns empty', async () => {
    const { sut, loadAccountsSpy } = makeSut()
    loadAccountsSpy.result = []
    const httpResponse = await sut.handle({ role })
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadAccounts throws', async () => {
    const { sut, loadAccountsSpy } = makeSut()
    jest.spyOn(loadAccountsSpy, 'loadAccounts').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle({ role })
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
