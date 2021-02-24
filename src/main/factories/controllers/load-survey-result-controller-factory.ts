import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { LoadSurveyResultController } from '@/presentation/controllers/load-survey-result-controller'
import { makeDbCheckSurveyById } from '@/main/factories'
import { makeDbLoadSurveyResult } from '@/main/factories/usecases/survey-result/db-load-survey-result-factory'

export const makeLoadSurveyResultController = (): Controller => {
  const controller = new LoadSurveyResultController(
    makeDbCheckSurveyById(),
    makeDbLoadSurveyResult()
  )
  return makeLogControllerDecorator(controller)
}
