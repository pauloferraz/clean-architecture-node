import { FileUpload } from '@/domain/usecases'
import { RemoteFileUpload } from '@/data/usecases'
import { AWSFileUploader } from '@/infra/remote/aws-file-uploader'

export const makeRemoteFileUpload = (): FileUpload => {
  const awsFileUploader = new AWSFileUploader()
  return new RemoteFileUpload(awsFileUploader)
}
