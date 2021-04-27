import { AddProduct } from '@/domain/usecases'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class AddProductController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addProduct: AddProduct
  ) {}

  async handle(request: AddProductController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

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
    qtd_min: number
    payment: number
    custom: boolean
    production: string
    image: ProductImage[]
    active: boolean
  }

  interface ProductImage {
    url: string
  }
}
