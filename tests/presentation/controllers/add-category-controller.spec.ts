import { AddCategoryController } from '@/presentation/controllers'
import { throwError } from '@/tests/domain/mocks'
import { AddCategorySpy, ValidationSpy } from '@/tests/presentation/mocks'
import { badRequest, noContent, serverError } from '@/presentation/helpers'

import faker from 'faker'

const mockRequest = (): AddCategoryController.Request => ({
  name: faker.random.words(),
  parent: faker.random.words(),
  category: faker.random.words(),
  active: true
})

type SutTypes = {
  sut: AddCategoryController
  validationSpy: ValidationSpy
  addCategorySpy: AddCategorySpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addCategorySpy = new AddCategorySpy()
  const sut = new AddCategoryController(validationSpy, addCategorySpy)
  return {
    sut,
    validationSpy,
    addCategorySpy
  }
}

describe('AddCategory Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call AddCategory with correct values', async () => {
    const { sut, addCategorySpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addCategorySpy.params).toEqual(request)
  })

  test('Should return 500 if AddCategory throws', async () => {
    const { sut, addCategorySpy } = makeSut()
    jest.spyOn(addCategorySpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
