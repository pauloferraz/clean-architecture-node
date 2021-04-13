import { LoadCategoryByName } from '@/domain/usecases'

export interface LoadCategoryByNameRepository {
  load: (name: string) => Promise<LoadCategoryByNameRepository.Result>
}

export namespace LoadCategoryByNameRepository {
  export type Result = LoadCategoryByName.Result
}
