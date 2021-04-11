import { AddCategory } from '@/domain/usecases'
import { noContent, serverError } from '@/presentation/helpers/http-helper'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class AddCategoryController implements Controller {
  constructor(private readonly addCategory: AddCategory) {}

  async handle(request: AddCategoryController.Request): Promise<HttpResponse> {
    try {
      const { name, description, image, active } = request
      await this.addCategory.add({
        name,
        description,
        image,
        active
      })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddCategoryController {
  export type Request = {
    name: string
    description: string
    image: string
    active: boolean
  }
}
