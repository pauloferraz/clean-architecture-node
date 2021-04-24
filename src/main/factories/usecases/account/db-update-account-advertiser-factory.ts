import { UpdateAccountAdvertiser } from '@/domain/usecases'
import { DbUpdateAccountAdvertiser } from '@/data/usecases'
import { AccountMongoRepository } from '@/infra/db/mongodb/account-mongo-repository'

export const makeDbUpdateAccountAdvertiser = (): UpdateAccountAdvertiser => {
  const accountMongoRepository = new AccountMongoRepository()
  return new DbUpdateAccountAdvertiser(accountMongoRepository, accountMongoRepository)
}
