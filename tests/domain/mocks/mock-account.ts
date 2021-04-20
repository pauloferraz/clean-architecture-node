import { AddAccount, Authentication, LoadAccounts } from '../usecases'
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
