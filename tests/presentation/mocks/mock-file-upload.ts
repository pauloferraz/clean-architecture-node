import { UploadedFile, File } from '@/domain/models'
import { FileUpload } from '@/domain/usecases'

export class FileUploadSpy implements FileUpload {
  files: File[]
  result: UploadedFile

  async upload(files: File[]): Promise<UploadedFile[]> {
    this.files = files

    return [
      {
        path: 'any_path'
      }
    ]
  }
}
