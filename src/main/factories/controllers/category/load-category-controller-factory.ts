import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { LoadCategoriesController } from '@/presentation/controllers'
import { makeDbLoadCategories } from '@/main/factories/usecases'

export const makeLoadCategoriesController = (): Controller => {
  const controller = new LoadCategoriesController(makeDbLoadCategories())
  return makeLogControllerDecorator(controller)
}
