import { AddCategory, LoadCategories, LoadCategoryByName } from '@/domain/usecases'
import { mockCategoryModel } from '@/tests/domain/mocks'

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

export class LoadCategoriesSpy implements LoadCategories {
  count: number = 0
  result = [mockCategoryModel(), mockCategoryModel()]

  async load(): Promise<LoadCategories.Result> {
    this.count++
    return this.result
  }
}
