import { File } from '@/domain/models'

export const mockFile = (): File[] => {
  return [
    {
      name: 'any_name',
      size: 1024,
      type: 'image/png',
      extension: '.png',
      content: new ArrayBuffer(1024)
    }
  ]
}
