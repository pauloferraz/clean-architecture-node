import { Collection } from 'mongodb'
import { AddSurveyModel } from '../../../../data/usecases/add-survey/db-survey-protocols'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'

let surveyCollection: Collection

describe('Survey mongo repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  const makeSurveyData = (): AddSurveyModel => ({
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        survey: 'any_survey'
      },
      {
        survey: 'any_survey'
      }
    ]
  })

  const makeSut = (): SurveyMongoRepository => {
    return new SurveyMongoRepository()
  }

  test('should add a survey on success', async () => {
    const sut = makeSut()
    await sut.add(makeSurveyData())
    const survey = await surveyCollection.findOne({ question: 'any_question' })
    expect(survey).toBeTruthy()
  })
})
