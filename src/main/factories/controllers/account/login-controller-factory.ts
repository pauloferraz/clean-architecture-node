import { Controller } from '@/presentation/protocols'
import { LoginController } from '@/presentation/controllers/account/login-controller'
import { makeDbAuthentication } from '@/main/factories/usecases/account/db-authentication-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(controller)
}
