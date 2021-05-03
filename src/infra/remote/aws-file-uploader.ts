import { S3 } from 'aws-sdk'
import { FileUploader } from '@/data/protocols'
import { File, UploadedFile } from '@/domain/models'
import env from '@/main/config/env'

export class AWSFileUploader implements FileUploader {
  private readonly client: S3

  constructor() {
    this.client = new S3({
      accessKeyId: env.aws_access_key_id,
      secretAccessKey: env.aws_secret_access_key
    })
  }

  private generateFileKey(file: File, timestamp: number): string {
    return `${file.name}-${timestamp}.${file.extension}`
  }

  private async uploadFile(file: File): Promise<string> {
    const timestamp = Date.now()
    const fileKey = this.generateFileKey(file, timestamp)

    const params = {
      Bucket: env.AWS_S3_BUCKET,
      Key: fileKey,
      ContentType: file.type,
      Body: file.content,
      ACL: env.defaultFilesACL
    }

    this.client.upload(params, function (err, data) {
      if (err) {
        throw err
      }
      console.log(`File uploaded successfully. ${data.Location}`)
    })

    return `https://teste-festae.s3.amazonaws.com/${fileKey}`
  }

  async upload(files: File | File[]): Promise<UploadedFile | UploadedFile[] | undefined> {
    try {
      if (Array.isArray(files)) {
        const paths = await Promise.all(files.map(async (file) => this.uploadFile(file)))
        return paths.map((path) => ({ path }))
      }

      const path = await this.uploadFile(files)
      return {
        path
      }
    } catch {
      return undefined
    }
  }
}
