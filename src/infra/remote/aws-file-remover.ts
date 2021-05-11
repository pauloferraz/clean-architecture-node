import { S3 } from 'aws-sdk'
import { RemoverFile } from '@/data/protocols'
import env from '@/main/config/env'

export class AWSRemoverFile implements RemoverFile {
  private readonly client: S3

  constructor() {
    this.client = new S3({
      accessKeyId: env.aws_access_key_id,
      secretAccessKey: env.aws_secret_access_key
    })
  }

  async remove(data: RemoverFile.Params): Promise<void> {
    const params = {
      Bucket: env.AWS_S3_BUCKET,
      Key: data.file
    }

    this.client.deleteObject(params, function (err, data) {
      if (err) return new Error('Delete fail')
      else console.log('Successo', data)
    })
  }
}
