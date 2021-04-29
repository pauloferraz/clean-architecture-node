import { AddProduct } from '@/domain/usecases'
import { DbAddProduct } from '@/data/usecases'
import { ProductMongoRepository } from '@/infra/db'

export const makeDbAddProduct = (): AddProduct => {
  const productMongoRepository = new ProductMongoRepository()
  return new DbAddProduct(productMongoRepository)
}
