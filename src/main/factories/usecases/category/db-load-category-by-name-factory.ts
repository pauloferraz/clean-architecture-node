import { LoadCategoryByName } from '@/domain/usecases'
import { DbLoadCategoryByName } from '@/data/usecases'
import { CategoryMongoRepository } from '@/infra/db'

export const makeDbLoadCategoryByName = (): LoadCategoryByName => {
  const categoryMongoRepository = new CategoryMongoRepository()
  return new DbLoadCategoryByName(categoryMongoRepository)
}
