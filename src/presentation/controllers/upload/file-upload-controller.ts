import { File } from '@/domain/models'
import { FileUpload, LoadProductById, UpdateProduct } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class FileUploadController implements Controller {
  constructor(
    private readonly fileUpload: FileUpload,
    private readonly loadProductById: LoadProductById,
    private readonly updateProduct: UpdateProduct
  ) {}

  async handle(request: FileUploadController.Request): Promise<HttpResponse> {
    try {
      const { productId, files } = request.body

      const product: UpdateProduct.Params = await this.loadProductById.loadById(productId)

      if (!product) {
        return forbidden(new InvalidParamError('productId'))
      }

      const filesPaths = await this.fileUpload.upload(files)
      product.image = filesPaths
      product.price = 99
      product.productId = productId
      console.log(product)

      await this.updateProduct.update(product)

      return ok(filesPaths)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace FileUploadController {
  export type Request = {
    body: BodyFile
  }

  type BodyFile = {
    productId: string
    files: File[]
  }
}
