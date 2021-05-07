import { UpdateProduct } from '@/domain/usecases'

export interface UpdateProductRepository {
  update: (product: UpdateProductRepository.Params) => Promise<void>
}

export namespace UpdateProductRepository {
  export type Params = UpdateProduct.Params
}
