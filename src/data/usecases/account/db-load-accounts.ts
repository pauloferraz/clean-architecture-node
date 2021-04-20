import { LoadAccounts } from '@/domain/usecases'
import { LoadAccountsRepository } from '@/data/protocols/db'

export class DbLoadAccounts implements LoadAccounts {
  constructor(private readonly loadAccountsRepository: LoadAccountsRepository) {}

  async loadAccounts(role?: string): Promise<LoadAccounts.Result> {
    const accounts = await this.loadAccountsRepository.loadAccounts(role)
    return accounts
  }
}
