import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { AddCategoryController } from '@/presentation/controllers'
import { makeDbAddCategory, makeDbLoadCategoryByName } from '@/main/factories/usecases'
import { makeAddCategoryValidation } from './add-category-validation-factory'

export const makeAddCategoryController = (): Controller => {
  const controller = new AddCategoryController(
    makeAddCategoryValidation(),
    makeDbLoadCategoryByName(),
    makeDbAddCategory()
  )
  return makeLogControllerDecorator(controller)
}
