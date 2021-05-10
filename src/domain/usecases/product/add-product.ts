export interface AddProduct {
  add: (product: AddProduct.Params) => Promise<void>
}

export namespace AddProduct {
  export type Params = {
    name: string
    description: string
    category: string
    price: number
    qty_min: number
    paymentType: number
    custom: boolean
    production: string
    image: ProductImage[]
    active: boolean
  }

  export interface ProductImage {
    path: string
  }
}
