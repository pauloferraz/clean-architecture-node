export interface ProductModel {
  name: string
  description: string
  category: string
  price: number
  qtd_min: number
  payment: number
  custom: boolean
  production: string
  image: ProductImage[]
  active: boolean
  account_id: string
}

export interface ProductImage {
  url: string
}
