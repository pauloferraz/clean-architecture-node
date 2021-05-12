import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { FileRemoveController } from '@/presentation/controllers'
import {
  makeDbLoadProductById,
  makeDbUpdateProduct,
  makeRemoteFileRemove
} from '@/main/factories/usecases'

export const makeFileRemoveController = (): Controller => {
  const controller = new FileRemoveController(
    makeRemoteFileRemove(),
    makeDbLoadProductById(),
    makeDbUpdateProduct()
  )
  return makeLogControllerDecorator(controller)
}
