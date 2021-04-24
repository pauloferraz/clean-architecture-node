import {
  makeLoadAccountsController,
  makeLoadAccountByEmailController,
  makeUpdateAccountAdvertiserController
} from '@/main/factories/controllers'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { adminAuth, auth } from '@/main/middlewares'
import { Router } from 'express'

export default (router: Router): void => {
  router.get('/accounts', adminAuth, adaptRoute(makeLoadAccountsController()))
  router.get('/account', auth, adaptRoute(makeLoadAccountByEmailController()))
  router.put(
    '/account-advertiser',
    auth,
    adaptRoute(makeUpdateAccountAdvertiserController())
  )
}
