import { LoadProductByIdController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories'
import { makeDbLoadProductById } from '@/main/factories/usecases'

export const makeLoadProductByIdController = (): Controller => {
  const controller = new LoadProductByIdController(makeDbLoadProductById())
  return makeLogControllerDecorator(controller)
}
