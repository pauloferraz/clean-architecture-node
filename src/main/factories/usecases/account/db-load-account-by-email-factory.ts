import { DbLoadAccountByEmail } from '@/data/usecases'
import { LoadAccountByEmail } from '@/domain/usecases'
import { AccountMongoRepository } from '@/infra/db/mongodb/account-mongo-repository'

export const makeDbLoadAccountByEmail = (): LoadAccountByEmail => {
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByEmail(accountMongoRepository)
}
