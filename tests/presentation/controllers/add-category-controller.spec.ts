import { AddCategoryController } from '@/presentation/controllers'
import { throwError } from '@/tests/domain/mocks'
import { AddCategorySpy } from '@/tests/presentation/mocks'
import { noContent, serverError } from '@/presentation/helpers'

import faker from 'faker'

const mockRequest = (): AddCategoryController.Request => ({
  name: faker.random.words(),
  description: faker.random.words(),
  image: faker.image.food(100, 100),
  active: true
})

type SutTypes = {
  sut: AddCategoryController
  addCategorySpy: AddCategorySpy
}

const makeSut = (): SutTypes => {
  const addCategorySpy = new AddCategorySpy()
  const sut = new AddCategoryController(addCategorySpy)
  return {
    sut,
    addCategorySpy
  }
}

describe('AddCategory Controller', () => {
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
