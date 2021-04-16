import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'

import { AddCategoryRepository, LoadCategoryByNameRepository } from '@/data/protocols'
import { AddCategory, LoadCategoryByName } from '@/domain/usecases'

export class CategoryMongoRepository
  implements AddCategoryRepository, LoadCategoryByNameRepository {
  async add(data: AddCategory.Params): Promise<void> {
    const categoryCollection = await MongoHelper.getCollection('categories')
    const category = await categoryCollection.insertOne(data)
    return MongoHelper.map(category.ops[0])
  }

  async loadByName(name: string): Promise<LoadCategoryByName.Result> {
    const categoryCollection = await MongoHelper.getCollection('categories')
    const category = await categoryCollection.findOne({ name: name })
    return category && MongoHelper.map(category)
  }
}
