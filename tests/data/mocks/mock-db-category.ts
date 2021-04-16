import { AddCategoryRepository } from '@/data/protocols/db/category/add-category-repository'
import { LoadCategoryByName } from '@/domain/usecases'

import faker from 'faker'

export class AddCategoryRepositorySpy implements AddCategoryRepository {
  params: AddCategoryRepository.Params
  return = true

  async add(params: AddCategoryRepository.Params): Promise<void> {
    this.params = params
  }
}

export class LoadCategoryByNameRepositorySpy implements LoadCategoryByName {
  name: string
  result = {
    id: faker.random.uuid(),
    name: faker.name.findName(),
    parent: faker.random.word(),
    category: faker.random.word(),
    active: true
  }

  async loadByName(name: string): Promise<LoadCategoryByName.Result> {
    this.name = name
    return this.result
  }
}
