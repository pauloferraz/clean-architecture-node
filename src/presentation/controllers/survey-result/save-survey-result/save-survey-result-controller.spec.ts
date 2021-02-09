import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError } from '@/presentation/helpers/http/http-helper'
import { HttpRequest } from '@/presentation/protocols'
import { SaveSurveyResultController } from './save-survey-result-controller'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_survey_id'
  },
  body: {
    answer: 'any_answer'
  }
})

const makeFakeSurvey = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer'
    }
  ],
  date: new Date()
})

const makeSurveyLoadById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById(id: string): Promise<SurveyModel> {
      return new Promise((resolve) => resolve(makeFakeSurvey()))
    }
  }
  return new LoadSurveyByIdStub()
}

type SutTypes = {
  sut: SaveSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = makeSurveyLoadById()
  const sut = new SaveSurveyResultController(loadSurveyByIdStub)
  return { sut, loadSurveyByIdStub }
}

describe('SaveSurveyResultController', () => {
  test('should call LoadSurveyById with correct value', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })

  test('should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockResolvedValueOnce(null)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('should return 500 if LoadSurveyById throw', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockRejectedValue(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 403 if LoadSurveyById invalid answer is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        surveyId: 'any_survey_id'
      },
      body: { answer: 'wrong_answer' }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('answer')))
  })
})
