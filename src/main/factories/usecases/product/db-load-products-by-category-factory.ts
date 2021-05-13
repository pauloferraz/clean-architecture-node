import { LoadProductsByCategory } from '@/domain/usecases'
import { DbLoadProductsByCategory } from '@/data/usecases'
import { ProductMongoRepository } from '@/infra/db'

export const makeDbLoadProductsByCategory = (): LoadProductsByCategory => {
  const productMongoRepository = new ProductMongoRepository()
  return new DbLoadProductsByCategory(productMongoRepository)
}
