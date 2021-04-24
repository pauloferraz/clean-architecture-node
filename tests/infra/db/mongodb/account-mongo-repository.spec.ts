import { AccountMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddAccountParams } from '@/tests/domain/mocks'

import { Collection } from 'mongodb'
import faker from 'faker'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

let accountCollection: Collection

describe('AccountMongoRepository', () => {
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

  describe('add()', () => {
    test('Should return an account on success', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      const isValid = await sut.add(addAccountParams)
      expect(isValid).toBe(true)
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an account on success', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      Object.assign(addAccountParams, { active: true })
      await accountCollection.insertOne(addAccountParams)
      const account = await sut.loadByEmail(addAccountParams.email)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(addAccountParams.name)
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail(faker.internet.email())
      expect(account).toBeFalsy()
    })
  })

  describe('checkByEmail()', () => {
    test('Should return true if email is valid', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      await accountCollection.insertOne(addAccountParams)
      const exists = await sut.checkByEmail(addAccountParams.email)
      expect(exists).toBe(true)
    })

    test('Should return false if email is not valid', async () => {
      const sut = makeSut()
      const exists = await sut.checkByEmail(faker.internet.email())
      expect(exists).toBe(false)
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update the account accessToken on success', async () => {
      const sut = makeSut()
      const res = await accountCollection.insertOne(mockAddAccountParams())
      const fakeAccount = res.ops[0]
      expect(fakeAccount.accessToken).toBeFalsy()
      const accessToken = faker.random.uuid()
      await sut.updateAccessToken(fakeAccount._id, accessToken)
      const account = await accountCollection.findOne({ _id: fakeAccount._id })
      expect(account).toBeTruthy()
      expect(account.accessToken).toBe(accessToken)
    })
  })

  describe('loadByToken()', () => {
    let name = faker.name.findName()
    let email = faker.internet.email()
    let password = faker.internet.password()
    let accessToken = faker.random.uuid()

    beforeEach(() => {
      name = faker.name.findName()
      email = faker.internet.email()
      password = faker.internet.password()
      accessToken = faker.random.uuid()
    })

    test('Should return an account on loadByToken without role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken
      })
      const account = await sut.loadByToken(accessToken)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
    })

    test('Should return an account on loadByToken with admin role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken,
        role: 'admin'
      })
      const account = await sut.loadByToken(accessToken, 'admin')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
    })

    test('Should return null on loadByToken with invalid role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken
      })
      const account = await sut.loadByToken(accessToken, 'admin')
      expect(account).toBeFalsy()
    })

    test('Should return an account on loadByToken with if user is admin', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken,
        role: 'admin'
      })
      const account = await sut.loadByToken(accessToken)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
    })

    test('Should return null if loadByToken fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByToken(accessToken)
      expect(account).toBeFalsy()
    })
  })

  describe('loadAccounts()', () => {
    test('Should return accounts on success', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      await accountCollection.insertOne(addAccountParams)
      const accounts = await sut.loadAccounts()
      expect(accounts).toBeTruthy()
    })

    test('Should return null if loadAccounts fails', async () => {
      const sut = makeSut()
      const account = await sut.loadAccounts()
      expect(account.length).toBe(0)
    })
  })

  describe('updateAccountAdvertiser()', () => {
    test('Should update the account on success', async () => {
      const sut = makeSut()
      const res = await accountCollection.insertOne(mockAddAccountParams())
      const fakeAccount = res.ops[0]
      expect(fakeAccount).toBeTruthy()
      const advertiser = {
        name: faker.random.words(),
        email: faker.internet.email(),
        image: faker.image.imageUrl(),
        whatsapp: faker.random.word(),
        phone: faker.random.word(),
        postalCode: faker.random.word(),
        address: faker.random.words(),
        number: faker.random.word(),
        neighborhood: faker.random.word(),
        complement: faker.random.word(),
        city: faker.random.word(),
        state: faker.random.word()
      }
      await sut.updateAccountAdvertiser({ email: fakeAccount.email, advertiser })
      const account = await accountCollection.findOne({ email: fakeAccount.email })
      expect(account).toBeTruthy()
      expect(account.advertiser).toEqual(advertiser)
    })
  })
})
