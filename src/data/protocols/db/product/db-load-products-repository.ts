import { ProductModel } from '@/domain/models'

export interface LoadProductsRepository {
  load: () => Promise<LoadProductsRepository.Result>
}

export namespace LoadProductsRepository {
  export type Result = ProductModel[]
}
