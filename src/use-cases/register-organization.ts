import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'

import { OrganizationsRepository } from '@/repositories/organizations-repository'

import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterOrganizationUseCaseRequest {
  name: string
  owner: string
  email: string
  zip_code: string
  address: string
  phone: string
  password: string
  role?: 'ADMIN' | 'MEMBER'
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
    role,
  }: RegisterOrganizationUseCaseRequest): Promise<RegisterOrganizationUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const organizationWithSameEmail =
      await this.organizationRepository.findByEmail(email)

    if (organizationWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const organization = await this.organizationRepository.create({
      name,
      address,
      email,
      owner,
      password_hash,
      phone,
      zip_code,
      role,
    })

    return {
      organization,
    }
  }
}
