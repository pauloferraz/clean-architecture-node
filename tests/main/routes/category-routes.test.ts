import app from '@/main/config/app'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db'

import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'

let categoryCollection: Collection
let accountCollection: Collection

const mockAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Paulo',
    email: 'paulo.ferraz@gmail.com',
    password: '123',
    role: 'admin'
  })
  const id = res.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne(
    {
      _id: id
    },
    {
      $set: {
        accessToken
      }
    }
  )
  return accessToken
}

describe('Category Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    categoryCollection = await MongoHelper.getCollection('categories')
    await categoryCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /categories', () => {
    test('Should return 403 on add category without accessToken', async () => {
      await request(app)
        .post('/api/categories')
        .send({
          name: 'Bolo',
          description: 'Bolos decorados',
          image: 'http://image-name.com',
          active: true
        })
        .expect(403)
    })

    test('Should return 204 on add category with valid accessToken', async () => {
      const accessToken = await mockAccessToken()
      await request(app)
        .post('/api/categories')
        .set('x-access-token', accessToken)
        .send({
          name: 'Bolo',
          description: 'Bolos decorados',
          image: 'http://image-name.com',
          active: true
        })
        .expect(204)
    })
  })
})
