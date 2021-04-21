import { makeLoadAccountsController } from '@/main/factories/controllers'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { adminAuth } from '@/main/middlewares'
import { Router } from 'express'

export default (router: Router): void => {
  router.get('/accounts', adminAuth, adaptRoute(makeLoadAccountsController()))
}
