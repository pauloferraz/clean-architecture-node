import { makeAddCategoryValidation } from '@/main/factories'
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('AddCategoryValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddCategoryValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'description', 'image', 'active']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
