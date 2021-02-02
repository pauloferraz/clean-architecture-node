export interface AddSurveyModel {
  question: string
  answers: SurveyAnswer[]
  date: Date
}

export interface SurveyAnswer {
  image?: string
  survey: string
}

export interface AddSurvey {
  add: (data: AddSurveyModel) => Promise<void>
}
