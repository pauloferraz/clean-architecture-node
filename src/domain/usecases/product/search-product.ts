import { ProductModel } from '@/domain/models'

export interface SearchProduct {
  search: (search: string) => Promise<ProductModel[]>
}
