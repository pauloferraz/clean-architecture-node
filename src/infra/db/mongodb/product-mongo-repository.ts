import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { AddProductRepository } from '@/data/protocols'

export class ProductMongoRepository implements AddProductRepository {
  async add(data: AddProductRepository.Params): Promise<void> {
    const productCollection = await MongoHelper.getCollection('products')
    const product = await productCollection.insertOne(data)
    return MongoHelper.map(product.ops[0])
  }
}
