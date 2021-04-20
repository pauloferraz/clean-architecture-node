import { DbLoadCategories } from '@/data/usecases'
import { LoadCategoriesRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbLoadCategories
  loadCategoriesRepositorySpy: LoadCategoriesRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadCategoriesRepositorySpy = new LoadCategoriesRepositorySpy()
  const sut = new DbLoadCategories(loadCategoriesRepositorySpy)
  return {
    sut,
    loadCategoriesRepositorySpy
  }
}

describe('DbLoadCategories Usecase', () => {
  test('Should call LoadCategoriesRepository', async () => {
    const { sut, loadCategoriesRepositorySpy } = makeSut()
    await sut.load()
    expect(loadCategoriesRepositorySpy.count).toBe(1)
  })

  test('Should throw if LoadCategoriesRepository throws', async () => {
    const { sut, loadCategoriesRepositorySpy } = makeSut()
    jest.spyOn(loadCategoriesRepositorySpy, 'load').mockImplementationOnce(throwError)
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })

  test('Should return CategoryModel[] on success', async () => {
    const { sut, loadCategoriesRepositorySpy } = makeSut()
    const categoriesResult = await sut.load()
    expect(categoriesResult).toEqual(loadCategoriesRepositorySpy.result)
  })
})
