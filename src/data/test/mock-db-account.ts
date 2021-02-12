import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import {
  AccountModel,
  AddAccountParams
} from '@/data/usecases/account/add-account/add-account-protocols'
import { LoadAccountByEmailRepository } from '../protocols/db/account/load-account-by-email-repository'
import { LoadAccountByTokenRepository } from '../protocols/db/account/load-account-by-token-repository'
import { UpdateAccessTokenRepository } from '../protocols/db/account/update-token-repository'
import { mockAccountModel } from '@/domain/test'

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(accountData: AddAccountParams): Promise<AccountModel> {
      const fakeAccount = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password'
      }
      return new Promise((resolve) => resolve(fakeAccount))
    }
  }
  return new AddAccountRepositoryStub()
}

export const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail(email: string): Promise<AccountModel> {
      return new Promise((resolve) => resolve(mockAccountModel()))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

export const mockLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken(accessToken: string, role?: string): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel())
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

export const mockUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async updateAccessToken(id: string, token: string): Promise<void> {
      return Promise.resolve()
    }
  }
  return new UpdateAccessTokenRepositoryStub()
}
