import { UpdateAccountAdvertiser } from '@/domain/usecases'

export interface UpdateAccountAdvertiserRepository {
  updateAccountAdvertiser: (
    accountParams: UpdateAccountAdvertiserRepository.Params
  ) => Promise<void>
}

export namespace UpdateAccountAdvertiserRepository {
  export type Params = UpdateAccountAdvertiser.Params
}
