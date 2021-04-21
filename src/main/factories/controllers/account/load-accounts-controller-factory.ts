import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { LoadAccountsController } from '@/presentation/controllers'
import { makeDbLoadAccounts } from '@/main/factories/usecases'

export const makeLoadAccountsController = (): Controller => {
  const controller = new LoadAccountsController(makeDbLoadAccounts())
  return makeLogControllerDecorator(controller)
}
