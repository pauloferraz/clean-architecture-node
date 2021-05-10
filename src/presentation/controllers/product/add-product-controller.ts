import { AddProduct, LoadCategoryByName } from '@/domain/usecases'
import { CategoryNotExistsError } from '@/presentation/errors'
import { badRequest, noContent, serverError, notFound } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class AddProductController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadCategoryByName: LoadCategoryByName,
    private readonly addProduct: AddProduct
  ) {}

  async handle(request: AddProductController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const category = await this.loadCategoryByName.loadByName(request.category)
      if (!category) {
        return notFound(new CategoryNotExistsError())
      }

      request.category = category.category

      await this.addProduct.add(request)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
export namespace AddProductController {
  export type Request = {
    name: string
    description: string
    category: string
    price: number
    qty_min: number
    paymentType: number
    custom: boolean
    production: string
    image: ProductImage[]
    active: boolean
  }

  interface ProductImage {
    path: string
  }
}
