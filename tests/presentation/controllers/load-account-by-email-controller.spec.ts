import { LoadAccountByEmailController } from '@/presentation/controllers'
import { serverError, ok, noContent } from '@/presentation/helpers'
import { LoadAccountByEmailSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): LoadAccountByEmailController.Request => ({
  email: faker.internet.email()
})

type SutTypes = {
  sut: LoadAccountByEmailController
  loadAccountByEmailSpy: LoadAccountByEmailSpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailSpy = new LoadAccountByEmailSpy()
  const sut = new LoadAccountByEmailController(loadAccountByEmailSpy)
  return {
    sut,
    loadAccountByEmailSpy
  }
}

describe('LoadAccountByEmailController', () => {
  test('Should call LoadAccountByEmail with correct values', async () => {
    const { sut, loadAccountByEmailSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadAccountByEmailSpy.email).toBe(request.email)
  })

  test('Should return 500 if LoadAccountByEmail throws', async () => {
    const { sut, loadAccountByEmailSpy } = makeSut()
    jest.spyOn(loadAccountByEmailSpy, 'loadByEmail').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on return is empty', async () => {
    const { sut, loadAccountByEmailSpy } = makeSut()
    loadAccountByEmailSpy.result = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 200 on success', async () => {
    const { sut, loadAccountByEmailSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadAccountByEmailSpy.result))
  })
})
