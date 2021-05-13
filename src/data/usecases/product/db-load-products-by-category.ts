import { LoadProductsByCategoryRepository } from '@/data/protocols/db'
import { ProductModel } from '@/domain/models'
import { LoadProductsByCategory } from '@/domain/usecases'

export class DbLoadProductsByCategory implements LoadProductsByCategory {
  constructor(
    private readonly loadProductsByCategoryRepository: LoadProductsByCategoryRepository
  ) {}

  async loadByCategory(category: string): Promise<ProductModel[]> {
    const products = await this.loadProductsByCategoryRepository.loadByCategory(category)
    return products
  }
}
