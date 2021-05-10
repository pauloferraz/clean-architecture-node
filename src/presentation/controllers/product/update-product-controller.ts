import { UpdateProduct } from '@/domain/usecases'
import { noContent, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class UpdateProductController implements Controller {
  constructor(private readonly updateProduct: UpdateProduct) {}

  async handle(request: UpdateProductController.Request): Promise<HttpResponse> {
    try {
      await this.updateProduct.update(request)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
export namespace UpdateProductController {
  export type Request = {
    productId?: string
    name?: string
    description?: string
    category?: string
    price?: number
    qty_min?: number
    paymentType?: number
    custom?: boolean
    production?: string
    image?: ProductImage[]
    active?: boolean
  }

  interface ProductImage {
    path: string
  }
}
