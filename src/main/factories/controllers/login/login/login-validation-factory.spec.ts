import { Validation } from '@/presentation/protocols/validation'
import { mockEmailValidator } from '@/validation/test'
import {
  RequiredFieldValidation,
  ValidationComposite,
  EmailValidation
} from '@/validation/validators'
import { makeLoginValidation } from './login-validation-factory'

jest.mock('@/validation/validators/validation-composite')

describe('LoginValidationFactory', () => {
  test('should call ValidatonComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', mockEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
