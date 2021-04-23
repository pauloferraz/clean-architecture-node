import { mockAccountAdvertiser, throwError } from '@/tests/domain/mocks'
import { LoadAccountByEmailSpy, UpdateAccountSpy } from '@/tests/presentation/mocks'
import { UpdateAcccountController } from '@/presentation/controllers'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'

type SutTypes = {
  sut: UpdateAcccountController
  updateAccountSpy: UpdateAccountSpy
  loadAccountByEmailSpy: LoadAccountByEmailSpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailSpy = new LoadAccountByEmailSpy()
  const updateAccountSpy = new UpdateAccountSpy()
  const sut = new UpdateAcccountController(loadAccountByEmailSpy, updateAccountSpy)
  return {
    sut,
    updateAccountSpy,
    loadAccountByEmailSpy
  }
}

describe('UpdateAccount Controller', () => {
  test('Should call UpdateAccount with correct values', async () => {
    const { sut, updateAccountSpy } = makeSut()
    const request = mockAccountAdvertiser()
    await sut.handle(request)
    expect(updateAccountSpy.params).toBe(request)
  })

  test('Should call LoadAccountByEmail with correct values', async () => {
    const { sut, loadAccountByEmailSpy } = makeSut()
    const request = mockAccountAdvertiser()
    await sut.handle(request)
    expect(loadAccountByEmailSpy.email).toBe(request.email)
  })

  test('Should return 403 if an invalid email is provided', async () => {
    const { sut, loadAccountByEmailSpy } = makeSut()
    loadAccountByEmailSpy.result = null
    const httpResponse = await sut.handle(mockAccountAdvertiser())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('email')))
  })

  test('Should return 500 if UpdateAccount throws', async () => {
    const { sut, updateAccountSpy } = makeSut()
    jest.spyOn(updateAccountSpy, 'update').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockAccountAdvertiser())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 500 if LoadAccountByEmail throws', async () => {
    const { sut, loadAccountByEmailSpy } = makeSut()
    jest.spyOn(loadAccountByEmailSpy, 'loadByEmail').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockAccountAdvertiser())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut, updateAccountSpy } = makeSut()
    const request = mockAccountAdvertiser()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok(updateAccountSpy.result))
  })
})
