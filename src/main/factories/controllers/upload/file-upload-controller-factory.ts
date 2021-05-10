import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { FileUploadController } from '@/presentation/controllers'
import {
  makeRemoteFileUpload,
  makeDbLoadProductById,
  makeDbUpdateProduct
} from '@/main/factories/usecases'

export const makeFileUploadController = (): Controller => {
  const controller = new FileUploadController(
    makeRemoteFileUpload(),
    makeDbLoadProductById(),
    makeDbUpdateProduct()
  )
  return makeLogControllerDecorator(controller)
}
