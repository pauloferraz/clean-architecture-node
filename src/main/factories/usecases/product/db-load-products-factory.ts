import { LoadProducts } from '@/domain/usecases'
import { DbLoadProducts } from '@/data/usecases'
import { ProductMongoRepository } from '@/infra/db'

export const makeDbLoadProducts = (): LoadProducts => {
  const productMongoRepository = new ProductMongoRepository()
  return new DbLoadProducts(productMongoRepository)
}
