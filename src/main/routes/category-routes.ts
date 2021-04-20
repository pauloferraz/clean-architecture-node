import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { adminAuth } from '@/main/middlewares'
import {
  makeAddCategoryController,
  makeLoadCategoriesController
} from '@/main/factories/controllers'

export default (router: Router): void => {
  router.post('/categories', adminAuth, adaptRoute(makeAddCategoryController()))
  router.get('/categories', adaptRoute(makeLoadCategoriesController()))
}
