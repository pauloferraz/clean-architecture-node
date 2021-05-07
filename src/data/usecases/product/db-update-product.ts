import { UpdateProductRepository } from '@/data/protocols/db'
import { UpdateProduct } from '@/domain/usecases'

export class DbUpdateProduct implements UpdateProduct {
  constructor(private readonly updateProductRepository: UpdateProductRepository) {}

  async update(product: UpdateProduct.Params): Promise<void> {
    await this.updateProductRepository.update(product)
  }
}
