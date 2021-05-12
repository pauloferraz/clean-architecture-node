import { LoadProductsRepository } from '@/data/protocols/db'
import { ProductModel } from '@/domain/models'
import { LoadProducts } from '@/domain/usecases'

export class DbLoadProducts implements LoadProducts {
  constructor(private readonly loadProductsRepository: LoadProductsRepository) {}

  async load(): Promise<ProductModel[]> {
    const products = await this.loadProductsRepository.load()
    return products
  }
}
