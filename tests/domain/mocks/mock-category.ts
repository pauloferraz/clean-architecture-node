import { CategoryModel } from '@/domain/models'
import { AddCategory } from '@/domain/usecases'

import faker from 'faker'

export const mockCategoryModel = (): CategoryModel => {
  return {
    id: faker.random.uuid(),
    name: faker.random.words(),
    parent: faker.random.words(),
    category: faker.random.word(),
    active: true
  }
}

export const mockAddCategoryParams = (): AddCategory.Params => ({
  name: faker.random.words(),
  parent: faker.random.words(),
  category: faker.random.word(),
  active: true
})
