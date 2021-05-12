import { Router, Request, Response } from 'express'
import { fileHandler } from '@/presentation/middlewares/file-handler'
import {
  makeFileUploadController,
  makeFileRemoveController
} from '@/main/factories/controllers'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import multer from 'multer'
import path from 'path'

const MAX_SIZE_TWO_MEGABYTES = 2 * 1024 * 1024

const upload = multer({
  limits: {
    fileSize: MAX_SIZE_TWO_MEGABYTES
  },
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new Error('Only images are allowed'))
    }
    callback(null, true)
  }
})

export default (router: Router): void => {
  router.post(
    '/upload',
    function (req, res, next) {
      upload.array('files', 5)(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(400).send({ error: err.message })
        }
        if (err) {
          return res.status(400).send({ error: err.message })
        }
        next()
      })
    },
    fileHandler,
    async (req: Request, res: Response) => {
      const { statusCode, body } = await makeFileUploadController().handle({
        body: req.body
      })

      return res.status(statusCode).json(body)
    }
  )
  router.put('/upload', adaptRoute(makeFileRemoveController()))
}
