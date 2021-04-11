import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { adminAuth } from '@/main/middlewares'
import { makeAddCategoryController } from '@/main/factories/controllers/category/add-category-controller-factory'

export default (router: Router): void => {
  router.post('/categories', adminAuth, adaptRoute(makeAddCategoryController()))
}
