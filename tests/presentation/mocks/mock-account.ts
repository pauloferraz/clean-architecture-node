import {
  AddAccount,
  Authentication,
  LoadAccountByEmail,
  LoadAccountByToken,
  LoadAccounts,
  UpdateAccountAdvertiser
} from '@/domain/usecases'
import { mockAccountAdvertiser, mockAccounts } from '@/tests/domain/mocks'

import faker from 'faker'

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params
  result = true

  async add(params: AddAccount.Params): Promise<AddAccount.Result> {
    this.params = params
    return this.result
  }
}

export class AuthenticationSpy implements Authentication {
  params: Authentication.Params
  result = {
    accessToken: faker.random.uuid(),
    name: faker.name.findName()
  }

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params
    return this.result
  }
}

export class LoadAccountByEmailSpy implements LoadAccountByEmail {
  email: string
  result = mockAccountAdvertiser()

  async loadByEmail(email: string): Promise<LoadAccountByEmail.Result> {
    this.email = email
    return this.result
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  accessToken: string
  role: string
  result = {
    id: faker.random.uuid()
  }

  async load(accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    this.accessToken = accessToken
    this.role = role
    return this.result
  }
}

export class LoadAccountsSpy implements LoadAccounts {
  role: string
  count: number = 0
  result = mockAccounts()

  async loadAccounts(role?: string): Promise<LoadAccounts.Result> {
    this.role = role
    this.count++
    return this.result
  }
}

export class UpdateAccountAdvertiserSpy implements UpdateAccountAdvertiser {
  params: UpdateAccountAdvertiser.Params
  result = mockAccountAdvertiser()

  async update(
    params: UpdateAccountAdvertiser.Params
  ): Promise<UpdateAccountAdvertiser.Result> {
    this.params = params
    return this.result
  }
}
