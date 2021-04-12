import { AddCategoryRepository } from '@/data/protocols/db/category/add-category-repository'
import { AddCategory } from '@/domain/usecases'

export class DbAddCategory implements AddCategory {
  constructor(private readonly addCategoryRepository: AddCategoryRepository) {}

  async add(data: AddCategory.Params): Promise<void> {
    await this.addCategoryRepository.add(data)
  }
}
