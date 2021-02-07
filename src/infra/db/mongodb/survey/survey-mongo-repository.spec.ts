import { Collection } from 'mongodb'
import { AddSurveyModel } from '@/data/usecases/add-survey/db-add-survey-protocols'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'

let surveyCollection: Collection

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

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
        answer: 'any_survey'
      },
      {
        answer: 'any_survey'
      }
    ],
    date: new Date()
  })

  describe('add()', () => {
    test('should add a survey on success', async () => {
      const sut = makeSut()
      await sut.add(makeSurveyData())
      const survey = await surveyCollection.findOne({ question: 'any_question' })
      expect(survey).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test('should loadAll surveys on success', async () => {
      await surveyCollection.insertMany([
        {
          question: 'any_question',
          answers: [
            {
              image: 'any_image',
              answer: 'any_survey'
            }
          ],
          date: new Date()
        },
        {
          question: 'any_question',
          answers: [
            {
              image: 'any_image',
              answer: 'any_survey'
            }
          ],
          date: new Date()
        }
      ])
      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(2)
    })

    test('should load empty list', async () => {
      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    test('should loadById return a survey on success', async () => {
      const res = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [
          {
            image: 'any_image',
            answer: 'any_survey'
          }
        ],
        date: new Date()
      })
      const sut = makeSut()
      const survey = await sut.loadById(res.ops[0]._id)
      expect(survey).toBeTruthy()
    })
  })
})
