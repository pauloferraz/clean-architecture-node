import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { AddCategoryController } from '@/presentation/controllers'
import { makeDbAddCategory } from '@/main/factories/usecases/category/db-add-survey-factory'

export const makeAddCategoryController = (): Controller => {
  const controller = new AddCategoryController(makeDbAddCategory())
  return makeLogControllerDecorator(controller)
}
