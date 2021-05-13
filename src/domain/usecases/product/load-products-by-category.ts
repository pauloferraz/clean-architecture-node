import { ProductModel } from '@/domain/models'

export interface LoadProductsByCategory {
  loadByCategory: (category: string) => Promise<ProductModel[]>
}
