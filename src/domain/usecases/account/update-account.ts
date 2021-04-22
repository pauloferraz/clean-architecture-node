import { AccountModel } from '@/domain/models'

export interface UpdateAccount {
  update: (account: UpdateAccount.Params) => Promise<UpdateAccount.Result>
}

export namespace UpdateAccount {
  export type Params = {
    email: string
  }
  export type Result = AccountModel
}
