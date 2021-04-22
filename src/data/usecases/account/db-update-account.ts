import { UpdateAccountRepository } from '@/data/protocols'
import { UpdateAccount } from '@/domain/usecases'

export class DbUpdateAccount implements UpdateAccount {
  constructor(private readonly updateAccountRepository: UpdateAccountRepository) {}

  async update(accountData: UpdateAccount.Params): Promise<UpdateAccount.Result> {
    const account = await this.updateAccountRepository.update(accountData)
    return account
  }
}
