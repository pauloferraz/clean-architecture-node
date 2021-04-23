import { AccountModel } from '@/domain/models'

export interface LoadAccountByEmail {
  loadByEmail: (email: string) => Promise<LoadAccountByEmail.Result>
}

export namespace LoadAccountByEmail {
  export type Result = AccountModel
}
