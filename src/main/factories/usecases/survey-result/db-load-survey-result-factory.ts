import { LoadSurveyResult } from '@/domain/usecases'
import { DbLoadSurveyResult } from '@/data/usecases'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey-mongo-repository'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result-mongo-repository'

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyResult(surveyResultMongoRepository, surveyMongoRepository)
}
