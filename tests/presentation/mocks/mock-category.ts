import { AddCategory, LoadCategoryByName } from '@/domain/usecases'

export class AddCategorySpy implements AddCategory {
  params: AddCategory.Params
  result = true

  async add(params: AddCategory.Params): Promise<void> {
    this.params = params
  }
}

export class LoadCategoryByNameSpy implements LoadCategoryByName {
  name: string
  result = null

  async loadByName(name: string): Promise<LoadCategoryByName.Result> {
    this.name = name
    return this.result
  }
}
