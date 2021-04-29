import { AddProductController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories'
import { makeAddProductValidation } from './add-product-validation-factory'
import { makeDbAddProduct } from '@/main/factories/usecases'

export const makeAddProductController = (): Controller => {
  const controller = new AddProductController(
    makeAddProductValidation(),
    makeDbAddProduct()
  )
  return makeLogControllerDecorator(controller)
}
