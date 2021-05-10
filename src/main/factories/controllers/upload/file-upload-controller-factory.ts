import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { FileUploadController } from '@/presentation/controllers'
import { makeRemoteFileUpload, makeDbLoadProductById } from '@/main/factories/usecases'

export const makeFileUploadController = (): Controller => {
  const controller = new FileUploadController(
    makeRemoteFileUpload(),
    makeDbLoadProductById()
  )
  return makeLogControllerDecorator(controller)
}
