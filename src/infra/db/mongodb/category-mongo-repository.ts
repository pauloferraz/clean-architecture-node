import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'

import { AddCategoryRepository } from '@/data/protocols'
import { AddCategory } from '@/domain/usecases'

export class CategoryMongoRepository implements AddCategoryRepository {
  async add(data: AddCategory.Params): Promise<AddCategory.Result> {
    const categoryCollection = await MongoHelper.getCollection('categories')
    const category = await categoryCollection.insertOne(data)
    return MongoHelper.map(category.ops[0])
  }
}
