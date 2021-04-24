import { LoadAccountByEmail } from '@/domain/usecases'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account'

export class DbLoadAccountByEmail implements LoadAccountByEmail {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async loadByEmail(email: string): Promise<LoadAccountByEmail.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(email)
    if (account) {
      return account
    }

    return null
  }
}
