import { ProductModel } from '@/domain/models'
import { AddProduct, LoadProductById, UpdateProduct } from '@/domain/usecases'
import { mockProductModel } from '@/tests/domain/mocks'

export class AddProductSpy implements AddProduct {
  params: AddProduct.Params
  result = true

  async add(params: AddProduct.Params): Promise<void> {
    this.params = params
  }
}

export class LoadProductByIdSpy implements LoadProductById {
  productId: string
  result = mockProductModel()

  async loadById(productId: string): Promise<ProductModel> {
    this.productId = productId
    return this.result
  }
}

export class UpdateProductSpy implements UpdateProduct {
  params: UpdateProduct.Params

  async update(params: UpdateProduct.Params): Promise<void> {
    this.params = params
  }
}
