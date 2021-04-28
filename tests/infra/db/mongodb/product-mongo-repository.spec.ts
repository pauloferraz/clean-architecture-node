import { ProductMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddProductParams } from '@/tests/domain/mocks'

import { Collection } from 'mongodb'

let productCollection: Collection

const makeSut = (): ProductMongoRepository => {
  return new ProductMongoRepository()
}

describe('ProductMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    productCollection = await MongoHelper.getCollection('products')
    await productCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should add a product on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddProductParams())
      const count = await productCollection.countDocuments()
      expect(count).toBe(1)
    })
  })
})
