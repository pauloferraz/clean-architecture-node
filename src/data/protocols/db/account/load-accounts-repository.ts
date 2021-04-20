import { AccountModel } from '@/domain/models'

export interface LoadAccountsRepository {
  loadAccounts: (role?: string) => Promise<LoadAccountsRepository.Result>
}

export namespace LoadAccountsRepository {
  export type Result = AccountModel[]
}
