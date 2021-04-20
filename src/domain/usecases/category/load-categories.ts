import { CategoryModel } from '@/domain/models'

export interface LoadCategories {
  load: () => Promise<LoadCategories.Result>
}

export namespace LoadCategories {
  export type Result = CategoryModel[]
}
