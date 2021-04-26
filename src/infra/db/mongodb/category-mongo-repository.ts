import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'

import {
  AddCategoryRepository,
  LoadCategoriesRepository,
  LoadCategoryByNameRepository
} from '@/data/protocols'

export class CategoryMongoRepository
  implements
    AddCategoryRepository,
    LoadCategoryByNameRepository,
    LoadCategoriesRepository {
  async add(data: AddCategoryRepository.Params): Promise<void> {
    const categoryCollection = await MongoHelper.getCollection('categories')
    const category = await categoryCollection.insertOne(data)
    return MongoHelper.map(category.ops[0])
  }

  async loadByName(name: string): Promise<LoadCategoryByNameRepository.Result> {
    const categoryCollection = await MongoHelper.getCollection('categories')
    const category = await categoryCollection.findOne({ name: name })
    return category && MongoHelper.map(category)
  }

  async load(): Promise<LoadCategoriesRepository.Result> {
    const categoryCollection = await MongoHelper.getCollection('categories')
    const categories = await categoryCollection.find().toArray()
    return categories && MongoHelper.mapCollection(categories)
  }
}
