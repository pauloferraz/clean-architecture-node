import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'

export const makeAddCategoryValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'description', 'image', 'active']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
