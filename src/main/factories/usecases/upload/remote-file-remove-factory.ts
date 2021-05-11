import { RemoveFile } from '@/domain/usecases'
import { RemoteRemoveFile } from '@/data/usecases'
import { AWSRemoverFile } from '@/infra/remote/aws-file-remover'

export const makeRemoteFileRemove = (): RemoveFile => {
  const awsRemoverFile = new AWSRemoverFile()
  return new RemoteRemoveFile(awsRemoverFile)
}
