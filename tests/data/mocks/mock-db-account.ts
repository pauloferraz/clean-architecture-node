import {
  AddAccountRepository,
  LoadAccountByEmailRepository,
  LoadAccountByTokenRepository,
  UpdateAccessTokenRepository,
  CheckAccountByEmailRepository,
  LoadAccountsRepository,
  UpdateAccountAdvertiserRepository
} from '@/data/protocols'

import { mockAccountAdvertiser, mockAccounts } from '@/tests/domain/mocks'

import faker from 'faker'

export class AddAccountRepositorySpy implements AddAccountRepository {
  params: AddAccountRepository.Params
  result = true

  async add(params: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    this.params = params
    return this.result
  }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  email: string
  result = mockAccountAdvertiser()

  async loadByEmail(email: string): Promise<LoadAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  email: string
  result = false

  async checkByEmail(email: string): Promise<CheckAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
  token: string
  role: string
  result = {
    id: faker.random.uuid()
  }

  async loadByToken(
    token: string,
    role?: string
  ): Promise<LoadAccountByTokenRepository.Result> {
    this.token = token
    this.role = role
    return this.result
  }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  id: string
  token: string

  async updateAccessToken(id: string, token: string): Promise<void> {
    this.id = id
    this.token = token
  }
}

export class LoadAccountsRepositorySpy implements LoadAccountsRepository {
  role: string
  result = mockAccounts()

  async loadAccounts(role?: string): Promise<LoadAccountsRepository.Result> {
    this.role = role
    return this.result
  }
}

export class UpdateAccountAdvertiserRepositorySpy
  implements UpdateAccountAdvertiserRepository {
  params: UpdateAccountAdvertiserRepository.Params

  async updateAccountAdvertiser(
    params: UpdateAccountAdvertiserRepository.Params
  ): Promise<void> {
    this.params = params
  }
}
