import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { FileRemoveController } from '@/presentation/controllers'
import { makeRemoteFileRemove } from '@/main/factories/usecases'

export const makeFileRemoveController = (): Controller => {
  const controller = new FileRemoveController(makeRemoteFileRemove())
  return makeLogControllerDecorator(controller)
}
