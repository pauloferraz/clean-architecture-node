import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { auth } from '@/main/middlewares'
import {
  makeAddProductController,
  makeUpdateProductController,
  makeLoadProductByIdController,
  makeLoadProductsController
} from '@/main/factories/controllers'

export default (router: Router): void => {
  router.post('/products', auth, adaptRoute(makeAddProductController()))
  router.put('/products/:productId', auth, adaptRoute(makeUpdateProductController()))
  router.get('/products/:productId', adaptRoute(makeLoadProductByIdController()))
  router.get('/products', adaptRoute(makeLoadProductsController()))
}
