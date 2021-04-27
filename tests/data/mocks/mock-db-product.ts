import { AddProductRepository } from '@/data/protocols'

export class AddProductRepositorySpy implements AddProductRepository {
  params: AddProductRepository.Params
  return = true

  async add(params: AddProductRepository.Params): Promise<void> {
    this.params = params
  }
}
