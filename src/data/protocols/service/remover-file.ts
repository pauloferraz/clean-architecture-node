import { RemoveFile } from '@/domain/usecases'

export interface RemoverFile {
  remove: (data: RemoverFile.Params) => Promise<void>
}

export namespace RemoverFile {
  export type Params = RemoveFile.Params
}
