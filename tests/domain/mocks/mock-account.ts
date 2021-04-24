import {
  AddAccount,
  Authentication,
  LoadAccounts,
  UpdateAccountAdvertiser
} from '../usecases'
import faker from 'faker'

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccounts = (): LoadAccounts.Result => [
  {
    id: faker.random.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    role: faker.random.word(),
    active: faker.random.boolean()
  },
  {
    id: faker.random.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    role: faker.random.word(),
    active: faker.random.boolean()
  },
  {
    id: faker.random.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    role: faker.random.word(),
    active: faker.random.boolean()
  }
]

export const mockAccountAdvertiser = (): UpdateAccountAdvertiser.Result => ({
  id: faker.random.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  role: faker.random.word(),
  active: faker.random.boolean(),
  advertiser: {
    name: faker.random.words(),
    email: faker.internet.email(),
    image: faker.image.imageUrl(),
    whatsapp: faker.random.word(),
    phone: faker.random.word(),
    postalCode: faker.random.word(),
    address: faker.random.words(),
    number: faker.random.word(),
    neighborhood: faker.random.word(),
    complement: faker.random.word(),
    city: faker.random.word(),
    state: faker.random.word()
  }
})
