import { FileUploader } from '@/data/protocols'
import { UploadedFile, File } from '@/domain/models'

export class FileUploaderSpy implements FileUploader {
  files: File | File[]
  uploadedFiles: string
  result: UploadedFile

  async upload(files: File | File[]): Promise<UploadedFile | UploadedFile[] | undefined> {
    this.files = files
    this.uploadedFiles = 'any_path'

    return {
      path: 'any_path'
    }
  }
}
