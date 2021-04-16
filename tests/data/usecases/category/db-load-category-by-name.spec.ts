import { DbLoadCategoryByName } from '@/data/usecases'
import { LoadCategoryByNameRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadCategoryByName
  loadCategoryByNameRepositorySpy: LoadCategoryByNameRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadCategoryByNameRepositorySpy = new LoadCategoryByNameRepositorySpy()
  const sut = new DbLoadCategoryByName(loadCategoryByNameRepositorySpy)
  return {
    sut,
    loadCategoryByNameRepositorySpy
  }
}

let categoryName: string

describe('DbLoadCategoryByName Usecase', () => {
  beforeEach(() => {
    categoryName = faker.random.word()
  })

  test('Should call LoadCategoryByNameRepository with correct values', async () => {
    const { sut, loadCategoryByNameRepositorySpy } = makeSut()
    await sut.loadByName(categoryName)
    expect(loadCategoryByNameRepositorySpy.name).toBe(categoryName)
  })

  test('Should throw if LoadCategoryByNameRepository throws', async () => {
    const { sut, loadCategoryByNameRepositorySpy } = makeSut()
    jest
      .spyOn(loadCategoryByNameRepositorySpy, 'loadByName')
      .mockImplementationOnce(throwError)
    const promise = sut.loadByName(categoryName)
    await expect(promise).rejects.toThrow()
  })

  test('Should return CategoryModel on success', async () => {
    const { sut, loadCategoryByNameRepositorySpy } = makeSut()
    const categoryResult = await sut.loadByName(categoryName)
    expect(categoryResult).toEqual(loadCategoryByNameRepositorySpy.result)
  })
})
