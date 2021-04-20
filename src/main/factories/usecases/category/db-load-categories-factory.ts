import { LoadCategories } from '@/domain/usecases'
import { DbLoadCategories } from '@/data/usecases'
import { CategoryMongoRepository } from '@/infra/db'

export const makeDbLoadCategories = (): LoadCategories => {
  const categoryMongoRepository = new CategoryMongoRepository()
  return new DbLoadCategories(categoryMongoRepository)
}
