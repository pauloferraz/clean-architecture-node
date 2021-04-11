import { AddAccount } from '@/domain/usecases'
import { DbAddAccount } from '@/data/usecases'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account-mongo-repository'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
