import { LoadCategoriesRepository } from '@/data/protocols'
import { LoadCategories } from '@/domain/usecases'

export class DbLoadCategories implements LoadCategories {
  constructor(private readonly loadCategoriesRepository: LoadCategoriesRepository) {}

  async load(): Promise<LoadCategories.Result> {
    const categories = this.loadCategoriesRepository.load()
    return categories
  }
}
