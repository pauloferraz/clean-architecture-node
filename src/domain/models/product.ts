export interface ProductModel {
  name: string
  description: string
  category: string
  price: number
  qty_min: number
  paymentType: number
  custom: boolean
  production: string
  image?: ProductImage[]
  active: boolean
  account_id?: string
}

export interface ProductImage {
  path: string
}
