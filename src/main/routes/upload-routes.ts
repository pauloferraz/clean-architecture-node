import { Router, Request, Response } from 'express'
import multer from 'multer'
import { fileHandler } from '@/presentation/middlewares/file-handler'
import { makeFileUploadController } from '@/main/factories/controllers'

const upload = multer()

export default (router: Router): void => {
  router.post(
    '/upload',
    upload.array('files', 5),
    fileHandler,
    async (req: Request, res: Response) => {
      const { statusCode, body } = await makeFileUploadController().handle({
        body: req.body
      })

      return res.status(statusCode).json(body)
    }
  )
}
