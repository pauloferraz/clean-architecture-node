import { AddCategory } from '@/domain/usecases'
import { DbAddCategory } from '@/data/usecases'
import { CategoryMongoRepository } from '@/infra/db'

export const makeDbAddCategory = (): AddCategory => {
  const categoryMongoRepository = new CategoryMongoRepository()
  return new DbAddCategory(categoryMongoRepository)
}
