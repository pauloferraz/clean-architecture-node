import { AddCategoryRepositorySpy } from '@/tests/data/mocks'
import { mockAddCategoryParams, throwError } from '@/tests/domain/mocks'
import { DbAddCategory } from '@/data/usecases'

type SutTypes = {
  sut: DbAddCategory
  addCategoryRepositorySpy: AddCategoryRepositorySpy
}

const makeSut = (): SutTypes => {
  const addCategoryRepositorySpy = new AddCategoryRepositorySpy()
  const sut = new DbAddCategory(addCategoryRepositorySpy)
  return {
    sut,
    addCategoryRepositorySpy
  }
}

describe('DbAddCategory Usecase', () => {
  test('Should call AddCategoryRepository with correct values', async () => {
    const { sut, addCategoryRepositorySpy } = makeSut()
    const categoryData = mockAddCategoryParams()
    await sut.add(categoryData)
    expect(addCategoryRepositorySpy.params).toEqual(categoryData)
  })

  test('Should throw if AddCategoryRepository throws', async () => {
    const { sut, addCategoryRepositorySpy } = makeSut()
    jest.spyOn(addCategoryRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddCategoryParams())
    await expect(promise).rejects.toThrow()
  })
})
