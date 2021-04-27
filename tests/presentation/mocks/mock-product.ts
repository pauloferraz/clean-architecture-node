import { AddProduct } from '@/domain/usecases'

export class AddProductSpy implements AddProduct {
  params: AddProduct.Params
  result = true

  async add(params: AddProduct.Params): Promise<void> {
    this.params = params
  }
}
