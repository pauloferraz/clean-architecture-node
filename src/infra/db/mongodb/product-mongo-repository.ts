import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { AddProductRepository, UpdateProductRepository } from '@/data/protocols'
import { ObjectId } from 'mongodb'

export class ProductMongoRepository implements AddProductRepository {
  async add(data: AddProductRepository.Params): Promise<void> {
    const productCollection = await MongoHelper.getCollection('products')
    const product = await productCollection.insertOne(data)
    return MongoHelper.map(product.ops[0])
  }

  async update(data: UpdateProductRepository.Params): Promise<void> {
    const productCollection = await MongoHelper.getCollection('products')

    await productCollection.findOneAndUpdate(
      {
        _id: new ObjectId(data.productId)
      },
      {
        $set: {
          name: data.name,
          description: data.description,
          category: data.category,
          price: data.price,
          qty_min: data.qty_min,
          paymentType: data.paymentType,
          custom: data.custom,
          production: data.production,
          image: data.image,
          active: data.active
        }
      },
      {
        upsert: true
      }
    )
  }
}
