import { RemoveFile } from '@/domain/usecases'
import { ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class FileRemoveController implements Controller {
  constructor(private readonly removeFile: RemoveFile) {}

  async handle(request: FileRemoveController.Request): Promise<HttpResponse> {
    try {
      await this.removeFile.remove(request)
      return ok('Removed file')
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace FileRemoveController {
  export type Request = {
    file: string
    productId: string
  }
}
