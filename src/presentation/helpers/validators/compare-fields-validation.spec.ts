import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const field = 'any_field'
const fieldToCompare = 'any_compare_field'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation(field, fieldToCompare)
}

describe('CompareFieldsValidation', () => {
  test('Should return an InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      [field]: 'any_field',
      [fieldToCompare]: 'other_field'
    })
    expect(error).toEqual(new InvalidParamError(fieldToCompare))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const value = 'any_field'
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })
    expect(error).toBeFalsy()
  })
})
