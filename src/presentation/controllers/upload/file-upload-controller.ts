import { File } from '@/domain/models'
import { FileUpload } from '@/domain/usecases'
import { ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class FileUploadController implements Controller {
  constructor(private readonly fileUpload: FileUpload) {}

  async handle(request: HttpRequest<{ files: File[] }>): Promise<HttpResponse> {
    try {
      const { files } = request.body as { files: File[] }

      const filesPaths = await this.fileUpload.upload(files)

      return ok(filesPaths)
    } catch (error) {
      return serverError(error)
    }
  }
}

export type HttpRequest<T = any> = {
  body?: T
}
