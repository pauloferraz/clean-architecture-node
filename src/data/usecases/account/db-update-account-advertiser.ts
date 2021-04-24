import {
  LoadAccountByEmailRepository,
  UpdateAccountAdvertiserRepository
} from '@/data/protocols'
import { UpdateAccountAdvertiser } from '@/domain/usecases'

export class DbUpdateAccountAdvertiser implements UpdateAccountAdvertiser {
  constructor(
    private readonly updateAccountAdvertiserRepository: UpdateAccountAdvertiserRepository,
    private readonly loadAccountByEmail: LoadAccountByEmailRepository
  ) {}

  async update(
    accountParam: UpdateAccountAdvertiser.Params
  ): Promise<UpdateAccountAdvertiser.Result> {
    await this.updateAccountAdvertiserRepository.updateAccountAdvertiser(accountParam)
    const account = await this.loadAccountByEmail.loadByEmail(accountParam.email)
    return account
  }
}
