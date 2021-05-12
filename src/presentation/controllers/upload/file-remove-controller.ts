import { LoadProductById, RemoveFile, UpdateProduct } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class FileRemoveController implements Controller {
  constructor(
    private readonly removeFile: RemoveFile,
    private readonly loadProductById: LoadProductById,
    private readonly updateProduct: UpdateProduct
  ) {}

  async handle(request: FileRemoveController.Request): Promise<HttpResponse> {
    try {
      const product: UpdateProduct.Params = await this.loadProductById.loadById(
        request.productId
      )

      if (!product) {
        return forbidden(new InvalidParamError('productId'))
      }

      const newImgs = product.image
      const newImgsFiltered = newImgs.filter(
        (newImgs) => !newImgs.path.includes(request.file)
      )

      product.image = newImgsFiltered

      product.productId = request.productId
      await this.updateProduct.update(product)

      await this.removeFile.remove(request)
      return ok('Removed file')
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace FileRemoveController {
  export type Request = {
    file: string
    productId: string
  }
}
