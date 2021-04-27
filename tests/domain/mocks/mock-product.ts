import { AddProduct } from '@/domain/usecases'

import faker from 'faker'

export const mockAddProductParams = (): AddProduct.Params => ({
  name: faker.random.words(),
  description: faker.random.words(),
  category: faker.random.words(),
  price: faker.random.number(),
  qtd_min: faker.random.number(),
  payment: faker.random.number(),
  custom: faker.random.boolean(),
  production: faker.random.word(),
  image: [{ url: faker.image.imageUrl() }],
  active: true
})
