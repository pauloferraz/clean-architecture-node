import { SurveyResultModel } from '@/domain/models/survey-result'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { SurveyModel } from '../models/survey'

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  date: new Date()
})

export const mockSurveyResultModel = (): SurveyResultModel => ({
  surveyId: 'any_id',
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer',
      count: 0,
      percent: 0,
      isCurrentAccountAnswer: false
    },
    {
      image: 'any_image',
      answer: 'other_answer',
      count: 0,
      percent: 0,
      isCurrentAccountAnswer: false
    }
  ],
  date: new Date()
})

export const mockEmptySurveyResultModel = (survey: SurveyModel): SurveyResultModel => {
  return {
    surveyId: survey.id,
    question: survey.question,
    date: survey.date,
    answers: survey.answers.map((answer) => ({
      ...answer,
      count: 0,
      percent: 0,
      isCurrentAccountAnswer: false
    }))
  }
}
