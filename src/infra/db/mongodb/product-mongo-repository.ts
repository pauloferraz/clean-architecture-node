/* eslint-disable @typescript-eslint/brace-style */
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import {
  AddProductRepository,
  UpdateProductRepository,
  LoadProductByIdRepository
} from '@/data/protocols'
import { ObjectId } from 'mongodb'

export class ProductMongoRepository
  implements AddProductRepository, UpdateProductRepository, LoadProductByIdRepository
{
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
        upsert: false
      }
    )
  }

  async loadById(productId: string): Promise<LoadProductByIdRepository.Result> {
    const productCollection = await MongoHelper.getCollection('products')
    const product = await productCollection.findOne(
      {
        _id: new ObjectId(productId)
      },
      {
        projection: {
          id: 1,
          name: 1,
          description: 1,
          category: 1,
          price: 1,
          qty_min: 1,
          paymentType: 1,
          custom: 1,
          production: 1,
          image: 1,
          active: 1
        }
      }
    )
    return product && MongoHelper.map(product)
  }
}
