import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'

import {
  AddCategoryRepository,
  LoadCategoriesRepository,
  LoadCategoryByNameRepository
} from '@/data/protocols'
import { AddCategory, LoadCategoryByName, LoadCategories } from '@/domain/usecases'

export class CategoryMongoRepository
  implements
    AddCategoryRepository,
    LoadCategoryByNameRepository,
    LoadCategoriesRepository {
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

  async load(): Promise<LoadCategories.Result> {
    const categories = await MongoHelper.getCollection('categories')
    return MongoHelper.map(categories)
  }
}
