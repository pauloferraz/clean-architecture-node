import { makeLoginController } from '@/main/factories/controllers'
import { makeSignUpController } from '@/main/factories/controllers/account/signup-controller-factory'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
