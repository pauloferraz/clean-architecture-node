import { UpdateProduct } from '@/domain/usecases'
import { DbUpdateProduct } from '@/data/usecases'
import { ProductMongoRepository } from '@/infra/db'

export const makeDbUpdateProduct = (): UpdateProduct => {
  const productMongoRepository = new ProductMongoRepository()
  return new DbUpdateProduct(productMongoRepository)
}
