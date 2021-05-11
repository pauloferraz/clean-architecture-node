import { RemoveFile } from '@/domain/usecases'
import { RemoverFile } from '@/data/protocols'

export class RemoteRemoveFile implements RemoveFile {
  constructor(private readonly removerFile: RemoverFile) {}

  async remove(data: RemoveFile.Params): Promise<void> {
    await this.removerFile.remove(data)
  }
}
