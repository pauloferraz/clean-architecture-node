import { SearchProductController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories'
import { makeDbSearchProduct } from '@/main/factories/usecases'

export const makeSearchProductController = (): Controller => {
  const controller = new SearchProductController(makeDbSearchProduct())
  return makeLogControllerDecorator(controller)
}
