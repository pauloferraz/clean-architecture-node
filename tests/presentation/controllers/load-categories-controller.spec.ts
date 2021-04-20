import { LoadCategoriesController } from '@/presentation/controllers'
import { ok, serverError, noContent } from '@/presentation/helpers'
import { LoadCategoriesSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: LoadCategoriesController
  loadCategoriesSpy: LoadCategoriesSpy
}

const makeSut = (): SutTypes => {
  const loadCategoriesSpy = new LoadCategoriesSpy()
  const sut = new LoadCategoriesController(loadCategoriesSpy)
  return {
    sut,
    loadCategoriesSpy
  }
}

describe('LoadCategoriesController', () => {
  test('Should call LoadCategories', async () => {
    const { sut, loadCategoriesSpy } = makeSut()
    await sut.handle()
    expect(loadCategoriesSpy.count).toBe(1)
  })

  test('Should return 200 on success', async () => {
    const { sut, loadCategoriesSpy } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok(loadCategoriesSpy.result))
  })

  test('Should return 204 if LoadCategories returns empty', async () => {
    const { sut, loadCategoriesSpy } = makeSut()
    loadCategoriesSpy.result = []
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadCategories throws', async () => {
    const { sut, loadCategoriesSpy } = makeSut()
    jest.spyOn(loadCategoriesSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
