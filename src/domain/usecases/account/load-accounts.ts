import { AccountModel } from '@/domain/models'

export interface LoadAccounts {
  loadAccounts: (role?: string) => Promise<LoadAccounts.Result>
}

export namespace LoadAccounts {
  export type Result = AccountModel[]
}
