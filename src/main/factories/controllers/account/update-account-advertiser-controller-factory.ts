import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { UpdateAcccountAdvertiserController } from '@/presentation/controllers'
import {
  makeDbLoadAccountByEmail,
  makeDbUpdateAccountAdvertiser
} from '@/main/factories/usecases'

export const makeUpdateAccountAdvertiserController = (): Controller => {
  const controller = new UpdateAcccountAdvertiserController(
    makeDbLoadAccountByEmail(),
    makeDbUpdateAccountAdvertiser()
  )
  return makeLogControllerDecorator(controller)
}
