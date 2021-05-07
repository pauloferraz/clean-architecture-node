import { ProductModel } from '@/domain/models'

export interface LoadProductByIdRepository {
  loadById: (productId: string) => Promise<ProductModel>
}

export namespace LoadProductByIdRepository {
  export type Result = ProductModel
}
