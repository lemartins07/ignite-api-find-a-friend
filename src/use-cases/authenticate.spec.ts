import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'

import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let organizationRepository: InMemoryOrganizationRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new AuthenticateUseCase(organizationRepository)
  })

  it('should be able to authenticate', async () => {
    await organizationRepository.create({
      address: 'Address 1',
      email: 'org@email.com',
      password_hash: await hash('123456', 6),
      name: 'ACME',
      owner: 'John Doe',
      phone: '+5551994498100',
      zip_code: '12345-678',
    })

    const { organization } = await sut.execute({
      email: 'org@email.com',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '1234561213',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await organizationRepository.create({
      address: 'Address 1',
      email: 'org@email.com',
      password_hash: await hash('123456', 6),
      name: 'ACME',
      owner: 'John Doe',
      phone: '+5551994498100',
      zip_code: '12345-678',
    })

    await expect(() =>
      sut.execute({
        email: 'org@email.com',
        password: '1234561213',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
