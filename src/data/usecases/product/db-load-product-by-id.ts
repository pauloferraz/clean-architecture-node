import { LoadProductByIdRepository } from '@/data/protocols/db'
import { ProductModel } from '@/domain/models'
import { LoadProductById } from '@/domain/usecases'

export class DbLoadProductById implements LoadProductById {
  constructor(private readonly loadProductByIdRepository: LoadProductByIdRepository) {}

  async loadById(productId: string): Promise<ProductModel> {
    const product = await this.loadProductByIdRepository.loadById(productId)
    return product
  }
}
