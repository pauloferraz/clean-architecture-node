import { UpdateProductController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories'
import { makeDbUpdateProduct } from '@/main/factories/usecases'

export const makeUpdateProductController = (): Controller => {
  const controller = new UpdateProductController(makeDbUpdateProduct())
  return makeLogControllerDecorator(controller)
}
