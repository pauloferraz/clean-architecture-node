import { LoadSurveysRepository } from '../../../../data/protocols/db/survey/load-surveys-repository'
import {
  AddSurveyModel,
  AddSurveyRepository
} from '../../../../data/usecases/add-survey/db-survey-protocols'
import { SurveyModel } from '../../../../domain/models/survey'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
  async add(surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.insertOne(surveyData)
    return MongoHelper.map(survey.ops[0])
  }

  async loadAll(): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys = await surveyCollection.find().toArray()
    return surveys
  }
}
