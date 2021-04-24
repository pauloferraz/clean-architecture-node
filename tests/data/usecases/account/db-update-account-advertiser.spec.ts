import { DbUpdateAccountAdvertiser } from '@/data/usecases'
import { mockAccountAdvertiser, throwError } from '@/tests/domain/mocks'
import {
  LoadAccountByEmailRepositorySpy,
  UpdateAccountAdvertiserRepositorySpy
} from '@/tests/data/mocks'

type SutTypes = {
  sut: DbUpdateAccountAdvertiser
  updateAccountAdvertiserRepositorySpy: UpdateAccountAdvertiserRepositorySpy
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateAccountAdvertiserRepositorySpy = new UpdateAccountAdvertiserRepositorySpy()
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const sut = new DbUpdateAccountAdvertiser(
    updateAccountAdvertiserRepositorySpy,
    loadAccountByEmailRepositorySpy
  )
  return {
    sut,
    updateAccountAdvertiserRepositorySpy,
    loadAccountByEmailRepositorySpy
  }
}

describe('DbUpdateAccount Usecase', () => {
  test('Should call DbUpdateAccountAdvertiser with correct value', async () => {
    const { sut, updateAccountAdvertiserRepositorySpy } = makeSut()
    const updateAccountParams = mockAccountAdvertiser()
    await sut.update({
      email: updateAccountParams.email,
      advertiser: updateAccountParams.advertiser
    })
    expect(updateAccountAdvertiserRepositorySpy.params).toEqual({
      email: updateAccountParams.email,
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
    const { sut, updateAccountAdvertiserRepositorySpy } = makeSut()
    jest
      .spyOn(updateAccountAdvertiserRepositorySpy, 'updateAccountAdvertiser')
      .mockImplementationOnce(throwError)
    const updateAccountParams = mockAccountAdvertiser()
    const promise = sut.update({
      email: updateAccountParams.email,
      advertiser: updateAccountParams.advertiser
    })
    await expect(promise).rejects.toThrow()
  })
})
