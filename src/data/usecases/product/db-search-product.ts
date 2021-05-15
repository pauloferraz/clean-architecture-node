import { SearchProductRepository } from '@/data/protocols/db'
import { SearchProduct } from '@/domain/usecases'

export class DbSearchProduct implements SearchProduct {
  constructor(private readonly searchProductRepository: SearchProductRepository) {}

  async search(search: string): Promise<SearchProductRepository.Result> {
    const products = await this.searchProductRepository.search(search)
    return products
  }
}
