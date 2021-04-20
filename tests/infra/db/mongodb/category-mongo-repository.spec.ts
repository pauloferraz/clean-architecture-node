import { CategoryMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddCategoryParams } from '@/tests/domain/mocks'

import { Collection } from 'mongodb'

let categoryCollection: Collection

const makeSut = (): CategoryMongoRepository => {
  return new CategoryMongoRepository()
}

describe('CategoryMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    categoryCollection = await MongoHelper.getCollection('categories')
    await categoryCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should add a category on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddCategoryParams())
      const count = await categoryCollection.countDocuments()
      expect(count).toBe(1)
    })
  })

  describe('loadByName()', () => {
    test('Should returns a category on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddCategoryParams())
      const category = await sut.loadByName(mockAddCategoryParams().name)
      expect(category).toBeTruthy()
    })
  })

  describe('load()', () => {
    test('Should returns a categories on success', async () => {
      const sut = makeSut()
      const categories = await sut.load()
      expect(categories).toBeTruthy()
    })
  })
})
