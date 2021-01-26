import { badRequest, ok, serverError } from '../../helpers/http/http-helper'
import {
  HttpRequest,
  HttpResponse,
  Controller,
  AddAccount,
  Validation
} from './signup-controller-protocols'

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body

      const account = await this.addAccount.add({
        name: name,
        email: email,
        password: password
      })

      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
