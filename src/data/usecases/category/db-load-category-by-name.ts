import { LoadCategoryByNameRepository } from '@/data/protocols'
import { LoadCategoryByName } from '@/domain/usecases'

export class DbLoadCategoryByName implements LoadCategoryByName {
  constructor(
    private readonly loadCategoryByNameRepository: LoadCategoryByNameRepository
  ) {}

  async load(name: string): Promise<LoadCategoryByName.Result> {
    const category = this.loadCategoryByNameRepository.load(name)
    return category
  }
}
