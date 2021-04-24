import { LoadAccountByEmail, UpdateAccountAdvertiser } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class UpdateAcccountAdvertiserController implements Controller {
  constructor(
    private readonly loadAccountByEmail: LoadAccountByEmail,
    private readonly updateAccountAdvertiser: UpdateAccountAdvertiser
  ) {}

  async handle(
    request: UpdateAcccountAdvertiserController.Request
  ): Promise<HttpResponse> {
    try {
      const exists = await this.loadAccountByEmail.loadByEmail(request.email)

      if (!exists) {
        return forbidden(new InvalidParamError('email'))
      }

      const account = await this.updateAccountAdvertiser.update({
        email: request.email,
        advertiser: request.advertiser
      })
      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpdateAcccountAdvertiserController {
  export type Request = UpdateAccountAdvertiser.Params
}
