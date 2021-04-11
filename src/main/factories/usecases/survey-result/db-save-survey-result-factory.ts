import { SaveSurveyResult } from '@/domain/usecases'
import { DbSaveSurveyResult } from '@/data/usecases'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result-mongo-repository'

export const makeDbSaveSurveyResult = (): SaveSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  return new DbSaveSurveyResult(surveyResultMongoRepository, surveyResultMongoRepository)
}
