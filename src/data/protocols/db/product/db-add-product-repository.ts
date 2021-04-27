import { AddProduct } from '@/domain/usecases'

export interface AddProductRepository {
  add: (data: AddProductRepository.Params) => Promise<void>
}

export namespace AddProductRepository {
  export type Params = AddProduct.Params
}
