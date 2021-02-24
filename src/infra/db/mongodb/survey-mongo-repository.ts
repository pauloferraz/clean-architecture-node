import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { ObjectId } from 'mongodb'
import {
  AddSurveyRepository,
  CheckSurveyByIdRepository,
  LoadAnswersBySurveyRepository
} from '@/data/protocols'
import { QueryBuilder } from '.'

export class SurveyMongoRepository
  implements
    AddSurveyRepository,
    LoadSurveysRepository,
    LoadSurveyByIdRepository,
    LoadAnswersBySurveyRepository {
  async add(surveyData: AddSurveyRepository.Params): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.insertOne(surveyData)
    return MongoHelper.map(survey.ops[0])
  }

  async loadAll(accountId: string): Promise<LoadSurveysRepository.Result> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const query = new QueryBuilder()
      .lookup({
        from: 'surveyResults',
        foreignField: 'surveyId',
        localField: '_id',
        as: 'result'
      })
      .project({
        _id: 1,
        question: 1,
        answers: 1,
        date: 1,
        didAnswer: {
          $gte: [
            {
              $size: {
                $filter: {
                  input: '$result',
                  as: 'item',
                  cond: {
                    $eq: ['$$item.accountId', new ObjectId(accountId)]
                  }
                }
              }
            },
            1
          ]
        }
      })
      .build()
    const surveys = await surveyCollection.aggregate(query).toArray()
    return MongoHelper.mapCollection(surveys)
  }

  async loadById(id: string): Promise<LoadSurveyByIdRepository.Result> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) })
    return survey && MongoHelper.map(survey)
  }

  async loadAnswers(id: string): Promise<LoadAnswersBySurveyRepository.Result> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const query = new QueryBuilder()
      .match({ _id: new ObjectId(id) })
      .project({
        _id: 0,
        answers: '$answers.answer'
      })
      .build()
    const surveys = await surveyCollection.aggregate(query).toArray()
    return surveys[0]?.answers || []
  }

  async checkById(id: string): Promise<CheckSurveyByIdRepository.Result> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne(
      { _id: new ObjectId(id) },
      { projection: { _id: 1 } }
    )
    return survey !== null
  }
}
