import { SearchProduct } from '@/domain/usecases'
import { noContent, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class SearchProductController implements Controller {
  constructor(private readonly searchProduct: SearchProduct) {}

  async handle(request: SearchProductController.Request): Promise<HttpResponse> {
    try {
      const products = await this.searchProduct.search(request.search)
      return products ? ok(products) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SearchProductController {
  export type Request = {
    search: string
  }
}
