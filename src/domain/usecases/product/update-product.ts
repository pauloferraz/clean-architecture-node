export interface UpdateProduct {
  update: (product: UpdateProduct.Params) => Promise<void>
}

export namespace UpdateProduct {
  export type Params = {
    productId?: string
    name?: string
    description?: string
    category?: string
    price?: number
    qty_min?: number
    paymentType?: number
    custom?: boolean
    production?: string
    image?: ProductImage[]
    active?: boolean
  }

  export interface ProductImage {
    url: string
  }
}
