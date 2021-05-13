import { LoadProductsByCategoryController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories'
import { makeDbLoadProductsByCategory } from '@/main/factories/usecases'

export const makeLoadProductsByCategoryController = (): Controller => {
  const controller = new LoadProductsByCategoryController(makeDbLoadProductsByCategory())
  return makeLogControllerDecorator(controller)
}
