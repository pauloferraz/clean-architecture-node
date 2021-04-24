import { mockAccountAdvertiser, throwError } from '@/tests/domain/mocks'
import {
  LoadAccountByEmailSpy,
  UpdateAccountAdvertiserSpy
} from '@/tests/presentation/mocks'
import { UpdateAcccountAdvertiserController } from '@/presentation/controllers'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'

type SutTypes = {
  sut: UpdateAcccountAdvertiserController
  updateAccountAdvertiserSpy: UpdateAccountAdvertiserSpy
  loadAccountByEmailSpy: LoadAccountByEmailSpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailSpy = new LoadAccountByEmailSpy()
  const updateAccountAdvertiserSpy = new UpdateAccountAdvertiserSpy()
  const sut = new UpdateAcccountAdvertiserController(
    loadAccountByEmailSpy,
    updateAccountAdvertiserSpy
  )
  return {
    sut,
    updateAccountAdvertiserSpy,
    loadAccountByEmailSpy
  }
}

let request: UpdateAcccountAdvertiserController.Request

describe('UpdateAccount Controller', () => {
  beforeAll(() => {
    const param = mockAccountAdvertiser()
    request = { email: param.email, advertiser: param.advertiser }
  })

  test('Should call UpdateAccount with correct values', async () => {
    const { sut, updateAccountAdvertiserSpy } = makeSut()
    await sut.handle(request)
    expect(updateAccountAdvertiserSpy.params).toEqual(request)
  })

  test('Should call LoadAccountByEmail with correct values', async () => {
    const { sut, loadAccountByEmailSpy } = makeSut()
    await sut.handle(request)
    expect(loadAccountByEmailSpy.email).toBe(request.email)
  })

  test('Should return 403 if an invalid email is provided', async () => {
    const { sut, loadAccountByEmailSpy } = makeSut()
    loadAccountByEmailSpy.result = null
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('email')))
  })

  test('Should return 500 if UpdateAccount throws', async () => {
    const { sut, updateAccountAdvertiserSpy } = makeSut()
    jest.spyOn(updateAccountAdvertiserSpy, 'update').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 500 if LoadAccountByEmail throws', async () => {
    const { sut, loadAccountByEmailSpy } = makeSut()
    jest.spyOn(loadAccountByEmailSpy, 'loadByEmail').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut, updateAccountAdvertiserSpy } = makeSut()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok(updateAccountAdvertiserSpy.result))
  })
})
