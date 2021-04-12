import { AddCategory } from '@/domain/usecases'

export class AddCategorySpy implements AddCategory {
  params: AddCategory.Params
  result = true

  async add(params: AddCategory.Params): Promise<void> {
    this.params = params
  }
}
