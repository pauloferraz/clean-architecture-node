export interface AddProduct {
  add: (product: AddProduct.Params) => Promise<void>
}

export namespace AddProduct {
  export type Params = {
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
  }

  export interface ProductImage {
    url: string
  }
}
