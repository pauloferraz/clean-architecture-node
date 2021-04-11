import { AddCategoryRepository } from '@/data/protocols/db/category/add-category-repository'

export class AddCategoryRepositorySpy implements AddCategoryRepository {
  params: AddCategoryRepository.Params
  return = true

  async add(params: AddCategoryRepository.Params): Promise<AddCategoryRepository.Result> {
    this.params = params
    return this.return
  }
}
