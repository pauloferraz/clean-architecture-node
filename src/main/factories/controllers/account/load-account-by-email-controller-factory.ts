import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { LoadAccountByEmailController } from '@/presentation/controllers'
import { makeDbLoadAccountByEmail } from '@/main/factories/usecases'

export const makeLoadAccountByEmailController = (): Controller => {
  const controller = new LoadAccountByEmailController(makeDbLoadAccountByEmail())
  return makeLogControllerDecorator(controller)
}
