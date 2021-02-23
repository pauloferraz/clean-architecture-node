import { LoadSurveyResultRepository } from '@/data/protocols/db/survey-result/load-survey-result-repository'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { mockLoadSurveyByIdRepository, mockLoadSurveyResultRepository } from '@/data/test'
import { mockSurveyResultModel } from '@/domain/test'
import { DbLoadSurveyResult } from './db-load-survey-result'
import MockDate from 'mockdate'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository()

  const sut = new DbLoadSurveyResult(
    loadSurveyResultRepositoryStub,
    loadSurveyByIdRepositoryStub
  )
  return { sut, loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub }
}

let surveyId: string
let accountId: string

describe('DbLoadSurveyResult usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })

  beforeEach(() => {
    surveyId = faker.random.uuid()
    accountId = faker.random.uuid()
  })

  test('should call LoadSurveyResultRepository', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    const loadSurveySpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    await sut.load(surveyId, accountId)
    expect(loadSurveySpy).toHaveBeenCalledWith(surveyId, accountId)
  })

  test('should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockRejectedValueOnce(new Error())
    const promise = sut.load(surveyId, accountId)
    await expect(promise).rejects.toThrow()
  })

  test('should call LoadSurveyById if LoadSurveyResultRepository returns null', async () => {
    const {
      sut,
      loadSurveyResultRepositoryStub,
      loadSurveyByIdRepositoryStub
    } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockReturnValueOnce(Promise.resolve(null))
    await sut.load(surveyId, accountId)
    expect(loadByIdSpy).toHaveBeenCalledWith(surveyId)
  })

  test('should return surveyResultModel with all counts 0 if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockReturnValueOnce(Promise.resolve(null))
    const surveyResult = await sut.load(surveyId, accountId)
    expect(surveyResult).toEqual(mockSurveyResultModel())
  })

  test('should return surveyResultModel on success ', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.load(surveyId, accountId)
    expect(surveyResult).toEqual(mockSurveyResultModel())
  })
})
