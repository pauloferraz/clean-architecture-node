import { LoadSurveyResultRepository } from '@/data/protocols/db/survey-result/load-survey-result-repository'
import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { SaveSurveyResult } from '@/domain/usecases/survey-result/save-survey-result'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) {}

  async save(data: SaveSurveyResult.Params): Promise<SaveSurveyResult.Result> {
    await this.saveSurveyResultRepository.save(data)
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(
      data.surveyId,
      data.accountId
    )
    return surveyResult
  }
}
