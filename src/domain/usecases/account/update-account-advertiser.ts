import { AccountModel, Advertiser } from '@/domain/models'

export interface UpdateAccountAdvertiser {
  update: (
    accountParams: UpdateAccountAdvertiser.Params
  ) => Promise<UpdateAccountAdvertiser.Result>
}

export namespace UpdateAccountAdvertiser {
  export type Params = {
    email: string
    advertiser: Advertiser
  }
  export type Result = AccountModel
}
