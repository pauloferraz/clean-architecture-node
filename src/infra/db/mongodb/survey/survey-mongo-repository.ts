import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import {
  AddSurveyParams,
  AddSurveyRepository
} from '@/data/usecases/survey/add-survey/db-add-survey-protocols'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { ObjectId } from 'mongodb'
import { QueryBuilder } from '../helpers'

export class SurveyMongoRepository
  implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async add(surveyData: AddSurveyParams): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.insertOne(surveyData)
    return MongoHelper.map(survey.ops[0])
  }

  async loadAll(accountId: string): Promise<SurveyModel[]> {
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

  async loadById(id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) })
    return survey && MongoHelper.map(survey)
  }
}
