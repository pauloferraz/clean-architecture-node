import { ProductModel } from '@/domain/models'

export interface SearchProductRepository {
  search: (search: string) => Promise<SearchProductRepository.Result>
}

export namespace SearchProductRepository {
  export type Result = ProductModel[]
}
