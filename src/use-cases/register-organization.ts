import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'

import { OrganizationsRepository } from '@/repositories/organization-repository'

interface RegisterOrganizationUseCaseRequest {
  name: string
  owner: string
  email: string
  zip_code: string
  address: string
  phone: string
  password: string
}

interface RegisterOrganizationUseCaseResponse {
  organization: Organization
}

export class RegisterOrganizationUseCase {
  constructor(private organizationRepository: OrganizationsRepository) {}

  async execute({
    name,
    address,
    email,
    owner,
    password,
    phone,
    zip_code,
  }: RegisterOrganizationUseCaseRequest): Promise<RegisterOrganizationUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const organizationWithSameEmail =
      await this.organizationRepository.findByEmail(email)

    if (organizationWithSameEmail) {
      throw new Error('E-mail already in use.')
    }

    const organization = await this.organizationRepository.create({
      name,
      address,
      email,
      owner,
      password_hash,
      phone,
      zip_code,
    })

    return {
      organization,
    }
  }
}
