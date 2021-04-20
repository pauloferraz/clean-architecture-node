import { LoadAccounts } from '@/domain/usecases'
import { noContent, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class AccountController implements Controller {
  constructor(private readonly loadAccounts: LoadAccounts) {}

  async handle(request: AccountController.Request): Promise<HttpResponse> {
    try {
      const accounts = await this.loadAccounts.loadAccounts(request.role)
      return accounts.length ? ok(accounts) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
export namespace AccountController {
  export type Request = {
    role?: string
  }
}
