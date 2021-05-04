import { FileUploadController } from '@/presentation/controllers'
import { mockFile, throwError } from '@/tests/domain/mocks'
import { FileUploadSpy } from '@/tests/presentation/mocks'
import { serverError } from '@/presentation/helpers'

type SutTypes = {
  sut: FileUploadController
  fileUploadSpy: FileUploadSpy
}

const makeSut = (): SutTypes => {
  const fileUploadSpy = new FileUploadSpy()

  const sut = new FileUploadController(fileUploadSpy)
  return {
    sut,
    fileUploadSpy
  }
}

describe('FileUploadController', () => {
  test('Should call FileUploadSpy with correct values', async () => {
    const { sut, fileUploadSpy } = makeSut()
    const request = mockFile()
    await sut.handle({ body: { files: request } })
    expect(fileUploadSpy.files).toEqual(request)
  })

  test('Should return 500 if AddCategory throws', async () => {
    const { sut, fileUploadSpy } = makeSut()
    jest.spyOn(fileUploadSpy, 'upload').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle({ body: { files: mockFile() } })
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
