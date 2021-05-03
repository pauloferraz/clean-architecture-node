import { File, UploadedFile } from '@/domain/models'
import { FileUpload } from '@/domain/usecases'
import { FileUploader } from '@/data/protocols'

export class RemoteFileUpload implements FileUpload {
  constructor(private readonly fileUploader: FileUploader) {}

  async upload(files: File[]): Promise<UploadedFile[]> {
    const uploadedFiles = await this.fileUploader.upload(files)

    if (!uploadedFiles) {
      throw new Error()
    }

    return uploadedFiles as UploadedFile[]
  }
}
