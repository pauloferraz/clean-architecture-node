import { FileUploadController } from '@/presentation/controllers'
import { mockFile, throwError } from '@/tests/domain/mocks'
import {
  FileUploadSpy,
  LoadProductByIdSpy,
  UpdateProductSpy
} from '@/tests/presentation/mocks'
import { serverError } from '@/presentation/helpers'

import faker from 'faker'

type SutTypes = {
  sut: FileUploadController
  fileUploadSpy: FileUploadSpy
  loadProductByIdSpy: LoadProductByIdSpy
  updateProductSpy: UpdateProductSpy
}

const makeSut = (): SutTypes => {
  const fileUploadSpy = new FileUploadSpy()
  const loadProductByIdSpy = new LoadProductByIdSpy()
  const updateProductSpy = new UpdateProductSpy()

  const sut = new FileUploadController(
    fileUploadSpy,
    loadProductByIdSpy,
    updateProductSpy
  )
  return {
    sut,
    fileUploadSpy,
    loadProductByIdSpy,
    updateProductSpy
  }
}

describe('FileUploadController', () => {
  test('Should call FileUploadSpy with correct values', async () => {
    const { sut, fileUploadSpy } = makeSut()
    const request = mockFile()
    await sut.handle({ body: { productId: faker.random.uuid(), files: request } })
    expect(fileUploadSpy.files).toEqual(request)
  })

  test('Should return 500 if AddCategory throws', async () => {
    const { sut, fileUploadSpy } = makeSut()
    jest.spyOn(fileUploadSpy, 'upload').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle({
      body: { productId: faker.random.uuid(), files: mockFile() }
    })
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
