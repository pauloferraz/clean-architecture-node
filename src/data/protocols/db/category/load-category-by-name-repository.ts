import { LoadCategoryByName } from '@/domain/usecases'

export interface LoadCategoryByNameRepository {
  loadByName: (name: string) => Promise<LoadCategoryByNameRepository.Result>
}

export namespace LoadCategoryByNameRepository {
  export type Result = LoadCategoryByName.Result
}
