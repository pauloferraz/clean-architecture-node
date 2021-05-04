import { FileUploaderSpy } from '@/tests/data/mocks'
import { mockFile, throwError } from '@/tests/domain/mocks'
import { RemoteFileUpload } from '@/data/usecases'

type SutTypes = {
  sut: RemoteFileUpload
  fileUploaderSpy: FileUploaderSpy
}

const makeSut = (): SutTypes => {
  const fileUploaderSpy = new FileUploaderSpy()
  const sut = new RemoteFileUpload(fileUploaderSpy)
  return {
    sut,
    fileUploaderSpy
  }
}

describe('RemoteFileUpload Usecase', () => {
  test('Should call fileUploaderSpy with correct values', async () => {
    const { sut, fileUploaderSpy } = makeSut()
    const fileParam = mockFile()
    await sut.upload(fileParam)
    expect(fileUploaderSpy.files).toEqual(fileParam)
  })

  test('Should throw if fileUploaderSpy return null', async () => {
    const { sut, fileUploaderSpy } = makeSut()
    await sut.upload(mockFile())
    fileUploaderSpy.uploadedFiles = undefined
    expect(fileUploaderSpy.uploadedFiles).toBe(undefined)
  })

  test('Should throw if fileUploaderSpy throws', async () => {
    const { sut, fileUploaderSpy } = makeSut()
    jest.spyOn(fileUploaderSpy, 'upload').mockImplementationOnce(throwError)
    const promise = sut.upload(mockFile())
    await expect(promise).rejects.toThrow()
  })
})
