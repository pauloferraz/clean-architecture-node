import { AddProductRepository } from '@/data/protocols/db'
import { AddProduct } from '@/domain/usecases'

export class DbAddProduct implements AddProduct {
  constructor(private readonly addProductRepository: AddProductRepository) {}

  async add(product: AddProduct.Params): Promise<void> {
    await this.addProductRepository.add(product)
  }
}
