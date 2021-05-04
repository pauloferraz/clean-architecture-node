import { FileUploader } from '@/data/protocols'
import { mockFile } from '@/tests/domain/mocks'
import { AWSFileUploader } from '@/infra/remote/aws-file-uploader'

const makeSut = (): FileUploader => {
  return new AWSFileUploader()
}

describe('CategoryMongoRepository', () => {
  describe('add()', () => {
    test('Should add a category on success', async () => {
      const sut = makeSut()
      jest.spyOn(sut, 'upload').mockResolvedValueOnce({ path: 'any_path' })

      const response = await sut.upload(mockFile())
      expect(response).toEqual({ path: 'any_path' })
    })
  })
})
