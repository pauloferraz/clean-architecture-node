import { AddCategory, LoadCategoryByName } from '@/domain/usecases'
import { CategoryAlreadyExistsError } from '@/presentation/errors'
import {
  badRequest,
  noContent,
  conflict,
  serverError
} from '@/presentation/helpers/http-helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class AddCategoryController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadCategoryByName: LoadCategoryByName,
    private readonly addCategory: AddCategory
  ) {}

  async handle(request: AddCategoryController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const { name, parent, category, active } = request
      const exists = await this.loadCategoryByName.loadByName(name)

      if (exists) {
        return conflict(new CategoryAlreadyExistsError())
      }

      await this.addCategory.add({
        name,
        parent,
        category,
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
    parent: string
    category: string
    active: boolean
  }
}
