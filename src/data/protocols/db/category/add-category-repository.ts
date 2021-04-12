import { AddCategory } from '@/domain/usecases'

export interface AddCategoryRepository {
  add: (data: AddCategoryRepository.Params) => Promise<void>
}

export namespace AddCategoryRepository {
  export type Params = AddCategory.Params
}
