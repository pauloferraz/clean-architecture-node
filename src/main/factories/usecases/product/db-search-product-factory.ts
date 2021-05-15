import { SearchProduct } from '@/domain/usecases'
import { DbSearchProduct } from '@/data/usecases'
import { ProductMongoRepository } from '@/infra/db'

export const makeDbSearchProduct = (): SearchProduct => {
  const productMongoRepository = new ProductMongoRepository()
  return new DbSearchProduct(productMongoRepository)
}
