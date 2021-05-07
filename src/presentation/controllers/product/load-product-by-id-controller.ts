import { LoadProductById } from '@/domain/usecases'
import { noContent, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class LoadProductByIdController implements Controller {
  constructor(private readonly loadProductById: LoadProductById) {}

  async handle(request: LoadProductByIdController.Request): Promise<HttpResponse> {
    try {
      const product = await this.loadProductById.loadById(request.productId)
      return product ? ok(product) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadProductByIdController {
  export type Request = {
    productId: string
  }
}
