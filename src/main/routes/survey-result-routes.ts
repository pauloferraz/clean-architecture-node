import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { auth } from '@/main/middlewares'
import { makeSaveSurveyResultController } from '@/main/factories/controllers'
import { makeLoadSurveyResultController } from '@/main/factories/controllers/survey-result/load-survey-result-controller-factory'

export default (router: Router): void => {
  router.put(
    '/surveys/:surveyId/results',
    auth,
    adaptRoute(makeSaveSurveyResultController())
  )
  router.get(
    '/surveys/:surveyId/results',
    auth,
    adaptRoute(makeLoadSurveyResultController())
  )
}
