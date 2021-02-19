import { MissingParamError } from '@/presentation/errors'
import {
  badRequest,
  ok,
  serverError,
  unauthorized
} from '@/presentation/helpers/http/http-helper'
import {
  Controller,
  HttpRequest,
  Authentication,
  Validation
} from './login-controller-protocols'
import { LoginController } from './login-controller'
import { mockValidation } from '@/validation/test'
import { mockAuthentication } from '@/presentation/test'
import { mockAuthenticationModel } from '@/domain/test'

const mockRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@email.com',
    password: 'any_password'
  }
})

type SutTypes = {
  sut: Controller
  authenticationStub: Authentication
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const authenticationStub = mockAuthentication()
  const validationStub = mockValidation()
  const sut = new LoginController(authenticationStub, validationStub)
  return {
    sut,
    authenticationStub,
    validationStub
  }
}

describe('Login Controller', () => {
  test('should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const auth = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(mockRequest())
    expect(auth).toHaveBeenCalledWith({
      email: 'any_email@email.com',
      password: 'any_password'
    })
  })

  test('should return 401 if invalid credencials are provided', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  test('should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest
      .spyOn(authenticationStub, 'auth')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 200 if valid credencials are provided', async () => {
    const { sut, authenticationStub } = makeSut()
    jest
      .spyOn(authenticationStub, 'auth')
      .mockResolvedValueOnce(mockAuthenticationModel())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token', name: 'any_name' }))
  })

  test('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validationSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
