import { ProductModel } from '@/domain/models'

export interface LoadProductsByCategoryRepository {
  loadByCategory: (category: string) => Promise<LoadProductsByCategoryRepository.Result>
}

export namespace LoadProductsByCategoryRepository {
  export type Result = ProductModel[]
}
