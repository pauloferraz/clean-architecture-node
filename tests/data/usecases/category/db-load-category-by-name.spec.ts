import { DbLoadCategoryByName } from '@/data/usecases'
import { LoadCategoryByNameRepositorySpy } from '@/tests/data/mocks'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadCategoryByName
  loadCategoryByNameRepositorySpy: LoadCategoryByNameRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadCategoryByNameRepositorySpy = new LoadCategoryByNameRepositorySpy()
  const sut = new DbLoadCategoryByName(loadCategoryByNameRepositorySpy)
  return {
    sut,
    loadCategoryByNameRepositorySpy
  }
}

let categoryName: string

describe('DbLoadCategoryByName Usecase', () => {
  beforeEach(() => {
    categoryName = faker.random.word()
  })

  test('Should call LoadCategoryByNameRepository with correct values', async () => {
    const { sut, loadCategoryByNameRepositorySpy } = makeSut()
    await sut.load(categoryName)
    expect(loadCategoryByNameRepositorySpy.name).toBe(categoryName)
  })
})
