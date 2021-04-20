import { CategoryModel } from '@/domain/models'

export interface LoadCategoriesRepository {
  load: () => Promise<LoadCategoriesRepository.Result>
}

export namespace LoadCategoriesRepository {
  export type Result = CategoryModel[]
}
