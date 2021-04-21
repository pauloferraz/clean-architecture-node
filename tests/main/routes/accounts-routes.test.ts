import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db'

import { Collection } from 'mongodb'
import request from 'supertest'
import { sign } from 'jsonwebtoken'
import env from '@/main/config/env'
import { hash } from 'bcrypt'

let accountCollection: Collection

const mockAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Rodrigo',
    email: 'rodrigo.manguinho@gmail.com',
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

describe('Account Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('GET /accounts', () => {
    test('Should return 403 on load accounts without accessToken', async () => {
      await request(app).get('/api/accounts').expect(403)
    })

    test('Should return 200 on success', async () => {
      const accessToken = await mockAccessToken()

      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'Rodrigo',
        email: 'rodrigo.manguinho@gmail.com',
        password
      })

      await request(app)
        .get('/api/accounts')
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
