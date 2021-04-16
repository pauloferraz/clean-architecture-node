import { LoadCategoryByNameRepository } from '@/data/protocols'
import { LoadCategoryByName } from '@/domain/usecases'

export class DbLoadCategoryByName implements LoadCategoryByName {
  constructor(
    private readonly loadCategoryByNameRepository: LoadCategoryByNameRepository
  ) {}

  async loadByName(name: string): Promise<LoadCategoryByName.Result> {
    const categoryName = this.loadCategoryByNameRepository.loadByName(name)
    return categoryName
  }
}
