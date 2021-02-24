import { SurveyMongoRepository } from '@/infra/db/mongodb/survey-mongo-repository'
import { LoadSurveys } from '@/domain/usecases/survey/load-surveys'
import { DbLoadSurveys } from '@/data/usecases/db-load-surveys'

export const makeDbLoadSurveys = (): LoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveys(surveyMongoRepository)
}
