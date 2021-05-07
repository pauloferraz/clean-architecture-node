import { ProductModel } from '@/domain/models'

export interface LoadProductById {
  loadById: (productId: string) => Promise<ProductModel>
}
