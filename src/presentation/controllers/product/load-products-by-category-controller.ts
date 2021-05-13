import { LoadProductsByCategory } from '@/domain/usecases'
import { noContent, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class LoadProductsByCategoryController implements Controller {
  constructor(private readonly loadProductsByCategory: LoadProductsByCategory) {}

  async handle(request: LoadProductsByCategoryController.Request): Promise<HttpResponse> {
    try {
      const products = await this.loadProductsByCategory.loadByCategory(request.category)

      return products ? ok(products) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadProductsByCategoryController {
  export type Request = {
    category: string
  }
}
