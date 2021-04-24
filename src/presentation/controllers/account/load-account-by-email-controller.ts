import { LoadAccountByEmail } from '@/domain/usecases'
import { noContent, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class LoadAccountByEmailController implements Controller {
  constructor(private readonly loadAccountByEmail: LoadAccountByEmail) {}

  async handle(request: LoadAccountByEmailController.Request): Promise<HttpResponse> {
    try {
      const account = await this.loadAccountByEmail.loadByEmail(request.email)
      return account ? ok(account) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
export namespace LoadAccountByEmailController {
  export type Request = {
    email: string
  }
}
