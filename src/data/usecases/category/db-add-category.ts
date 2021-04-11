import { AddCategoryRepository } from '@/data/protocols/db/category/add-category-repository'
import { AddCategory } from '@/domain/usecases'

export class DbAddCategory implements AddCategory {
  constructor(private readonly addCategoryRepository: AddCategoryRepository) {}

  async add(data: AddCategory.Params): Promise<AddCategory.Result> {
    let isValid = false
    isValid = await this.addCategoryRepository.add(data)

    return isValid
  }
}
