import { AddProductRepositorySpy } from '@/tests/data/mocks'
import { mockAddProductParams, throwError } from '@/tests/domain/mocks'
import { DbAddProduct } from '@/data/usecases'

type SutTypes = {
  sut: DbAddProduct
  addProductRepositorySpy: AddProductRepositorySpy
}

const makeSut = (): SutTypes => {
  const addProductRepositorySpy = new AddProductRepositorySpy()
  const sut = new DbAddProduct(addProductRepositorySpy)
  return {
    sut,
    addProductRepositorySpy
  }
}

describe('DbAddProduct Usecase', () => {
  test('Should call AddProductRepository with correct values', async () => {
    const { sut, addProductRepositorySpy } = makeSut()
    const productData = mockAddProductParams()
    await sut.add(productData)
    expect(addProductRepositorySpy.params).toEqual(productData)
  })

  test('Should throw if AddProductRepository throws', async () => {
    const { sut, addProductRepositorySpy } = makeSut()
    jest.spyOn(addProductRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddProductParams())
    await expect(promise).rejects.toThrow()
  })
})
