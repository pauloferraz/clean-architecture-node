import { AddProductController } from '@/presentation/controllers'
import { throwError } from '@/tests/domain/mocks'
import {
  AddProductSpy,
  LoadCategoryByNameSpy,
  ValidationSpy
} from '@/tests/presentation/mocks'
import { badRequest, noContent, serverError } from '@/presentation/helpers'

import faker from 'faker'

const mockRequest = (): AddProductController.Request => ({
  name: faker.random.words(),
  description: faker.random.words(),
  category: 'any_category',
  price: faker.random.number(),
  qty_min: faker.random.number(),
  paymentType: faker.random.number(),
  custom: faker.random.boolean(),
  production: faker.random.word(),
  image: [{ path: faker.image.imageUrl() }],
  active: true
})

type SutTypes = {
  sut: AddProductController
  validationSpy: ValidationSpy
  loadCategoryByNameSpy: LoadCategoryByNameSpy
  addProductSpy: AddProductSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const loadCategoryByNameSpy = new LoadCategoryByNameSpy()
  const addProductSpy = new AddProductSpy()
  const sut = new AddProductController(
    validationSpy,
    loadCategoryByNameSpy,
    addProductSpy
  )
  return {
    sut,
    validationSpy,
    loadCategoryByNameSpy,
    addProductSpy
  }
}

describe('AddProduct Controller', () => {
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

  test('Should call AddProduct with correct values', async () => {
    const { sut, addProductSpy, loadCategoryByNameSpy } = makeSut()
    const request = mockRequest()
    loadCategoryByNameSpy.result = 'any_category'
    await sut.handle(request)
    expect(addProductSpy.params).toEqual(request)
  })

  test('Should return 500 if AddProduct throws', async () => {
    const { sut, addProductSpy, loadCategoryByNameSpy } = makeSut()
    jest.spyOn(addProductSpy, 'add').mockImplementationOnce(throwError)
    loadCategoryByNameSpy.result = 'any_category'
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut, loadCategoryByNameSpy } = makeSut()
    loadCategoryByNameSpy.result = 'any_category'
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
