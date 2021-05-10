import { FileUploadController } from '@/presentation/controllers'
import { mockFile, throwError } from '@/tests/domain/mocks'
import { FileUploadSpy, LoadProductByIdSpy } from '@/tests/presentation/mocks'
import { serverError } from '@/presentation/helpers'

import faker from 'faker'

type SutTypes = {
  sut: FileUploadController
  fileUploadSpy: FileUploadSpy
  loadProductByIdSpy: LoadProductByIdSpy
}

const makeSut = (): SutTypes => {
  const fileUploadSpy = new FileUploadSpy()
  const loadProductByIdSpy = new LoadProductByIdSpy()

  const sut = new FileUploadController(fileUploadSpy, loadProductByIdSpy)
  return {
    sut,
    fileUploadSpy,
    loadProductByIdSpy
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
