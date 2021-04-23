import { AccountModel } from '@/domain/models'
import { LoadAccountByEmail, UpdateAccount } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class UpdateAcccountController implements Controller {
  constructor(
    private readonly loadAccountByEmail: LoadAccountByEmail,
    private readonly updateAccount: UpdateAccount
  ) {}

  async handle(request: UpdateAcccountController.Request): Promise<HttpResponse> {
    try {
      const exists = await this.loadAccountByEmail.loadByEmail(request.email)

      if (!exists) {
        return forbidden(new InvalidParamError('email'))
      }

      const account = await this.updateAccount.update(request)
      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpdateAcccountController {
  export type Request = AccountModel
}
