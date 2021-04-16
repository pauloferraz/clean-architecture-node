import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { AddCategoryController } from '@/presentation/controllers'
import { makeDbAddCategory } from '@/main/factories/usecases/category/db-add-survey-factory'
import { makeAddCategoryValidation } from './add-category-validation-factory'
import { makeDbLoadCategoryByName } from '../../usecases/category/db-load-category-by-name-factory'

export const makeAddCategoryController = (): Controller => {
  const controller = new AddCategoryController(
    makeAddCategoryValidation(),
    makeDbLoadCategoryByName(),
    makeDbAddCategory()
  )
  return makeLogControllerDecorator(controller)
}
