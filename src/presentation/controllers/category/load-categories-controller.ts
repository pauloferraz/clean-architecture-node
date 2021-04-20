import { LoadCategories } from '@/domain/usecases'
import { noContent, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class LoadCategoriesController implements Controller {
  constructor(private readonly loadCategories: LoadCategories) {}

  async handle(): Promise<HttpResponse> {
    try {
      const categories = await this.loadCategories.load()
      return categories.length ? ok(categories) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
