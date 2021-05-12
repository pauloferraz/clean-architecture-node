import { LoadProducts } from '@/domain/usecases'
import { noContent, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class LoadProductsController implements Controller {
  constructor(private readonly loadProducts: LoadProducts) {}

  async handle(): Promise<HttpResponse> {
    try {
      const products = await this.loadProducts.load()
      return products ? ok(products) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
