import { DbUpdateAccount } from '@/data/usecases'
import { mockAccountAdvertiser, throwError } from '@/tests/domain/mocks'
import { UpdateAccountRepositorySpy } from '../../mocks'

type SutTypes = {
  sut: DbUpdateAccount
  updateAccountRepository: UpdateAccountRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateAccountRepository = new UpdateAccountRepositorySpy()
  const sut = new DbUpdateAccount(updateAccountRepository)
  return {
    sut,
    updateAccountRepository
  }
}

describe('DbUpdateAccount Usecase', () => {
  test('Should call LoadAccountByEmailRepository with correct value', async () => {
    const { sut, updateAccountRepository } = makeSut()
    const updateAccountParams = mockAccountAdvertiser()
    await sut.update(updateAccountParams)
    expect(updateAccountRepository.params).toEqual({
      id: updateAccountParams.id,
      name: updateAccountParams.name,
      email: updateAccountParams.email,
      role: updateAccountParams.role,
      active: updateAccountParams.active,
      advertiser: {
        name: updateAccountParams.advertiser.name,
        email: updateAccountParams.advertiser.email,
        image: updateAccountParams.advertiser.image,
        whatsapp: updateAccountParams.advertiser.whatsapp,
        phone: updateAccountParams.advertiser.phone,
        postalCode: updateAccountParams.advertiser.postalCode,
        address: updateAccountParams.advertiser.address,
        number: updateAccountParams.advertiser.number,
        neighborhood: updateAccountParams.advertiser.neighborhood,
        complement: updateAccountParams.advertiser.complement,
        city: updateAccountParams.advertiser.city,
        state: updateAccountParams.advertiser.state
      }
    })
  })

  test('Should throw if UpdateAccountRepository throws', async () => {
    const { sut, updateAccountRepository } = makeSut()
    jest.spyOn(updateAccountRepository, 'update').mockImplementationOnce(throwError)
    const promise = sut.update(mockAccountAdvertiser())
    await expect(promise).rejects.toThrow()
  })

  test('Should return true on success', async () => {
    const { sut, updateAccountRepository } = makeSut()
    const account = await sut.update(mockAccountAdvertiser())
    expect(account).toBe(updateAccountRepository.result)
  })
})
