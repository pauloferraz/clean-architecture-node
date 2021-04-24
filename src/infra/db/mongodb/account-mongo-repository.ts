import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { AddAccount, UpdateAccountAdvertiser } from '@/domain/usecases'
import {
  CheckAccountByEmailRepository,
  LoadAccountByEmailRepository,
  LoadAccountByTokenRepository,
  LoadAccountsRepository,
  UpdateAccessTokenRepository,
  UpdateAccountAdvertiserRepository
} from '@/data/protocols'

export class AccountMongoRepository
  implements
    AddAccountRepository,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository,
    LoadAccountByTokenRepository,
    UpdateAccountAdvertiserRepository {
  async add(accountData: AddAccount.Params): Promise<AddAccount.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return result.ops[0] !== null
  }

  async loadByEmail(email: string): Promise<LoadAccountByEmailRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne(
      { email, active: true },
      {
        projection: {
          _id: 1,
          name: 1,
          email: 1,
          role: 1,
          password: 1,
          active: 1,
          advertiser: 1
        }
      }
    )
    return account && MongoHelper.map(account)
  }

  async loadByToken(
    token: string,
    role?: string
  ): Promise<LoadAccountByTokenRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne(
      {
        accessToken: token,
        $or: [{ role }, { role: 'admin' }]
      },
      {
        projection: {
          _id: 1
        }
      }
    )
    return account && MongoHelper.map(account)
  }

  async checkByEmail(email: string): Promise<CheckAccountByEmailRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne(
      {
        email
      },
      {
        projection: {
          _id: 1
        }
      }
    )
    return account !== null
  }

  async updateAccessToken(id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne(
      {
        _id: id
      },
      {
        $set: {
          accessToken: token
        }
      }
    )
  }

  async loadAccounts(role?: string): Promise<LoadAccountsRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const accounts = await accountCollection
      .find(
        {},
        {
          projection: {
            _id: 1,
            name: 1,
            email: 1,
            role: 1,
            active: 1,
            advertiser: 1
          }
        }
      )
      .toArray()
    return accounts && MongoHelper.mapCollection(accounts)
  }

  async updateAccountAdvertiser(
    accountParam: UpdateAccountAdvertiser.Params
  ): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne(
      {
        email: accountParam.email
      },
      { $set: { advertiser: accountParam.advertiser } },
      { upsert: true }
    )
  }
}
