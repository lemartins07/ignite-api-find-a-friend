import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'

import { RegisterOrganizationUseCase } from './register-organization'

let organizationRepository: InMemoryOrganizationRepository
let sut: RegisterOrganizationUseCase

describe('Register Organization Use Case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new RegisterOrganizationUseCase(organizationRepository)
  })

  it('should to register an Organization', async () => {
    const { organization } = await sut.execute({
      address: 'Address 1',
      email: 'org@email.com',
      password: '123456',
      name: 'ACME',
      owner: 'John Doe',
      phone: '+5551994498100',
      zip_code: '12345-678',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should hash organization password upon registration', async () => {
    const { organization } = await sut.execute({
      address: 'Address 1',
      email: 'org@email.com',
      password: '123456',
      name: 'ACME',
      owner: 'John Doe',
      phone: '+5551994498100',
      zip_code: '12345-678',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      organization.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    await sut.execute({
      address: 'Address 1',
      email: 'org@email.com',
      password: '123456',
      name: 'ACME',
      owner: 'John Doe',
      phone: '+5551994498100',
      zip_code: '12345-678',
    })

    await expect(() =>
      sut.execute({
        address: 'Address 1',
        email: 'org@email.com',
        password: '123456',
        name: 'ACME',
        owner: 'John Doe',
        phone: '+5551994498100',
        zip_code: '12345-678',
      }),
    ).rejects.Throw(Error)
  })
})
