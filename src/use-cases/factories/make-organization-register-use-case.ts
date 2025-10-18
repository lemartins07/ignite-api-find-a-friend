import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'

import { RegisterOrganizationUseCase } from '../register-organization'

export function makeOrganizationRegisterUseCase() {
  const organizationRepository = new PrismaOrganizationsRepository()
  const organizationRegisterUseCase = new RegisterOrganizationUseCase(
    organizationRepository,
  )

  return organizationRegisterUseCase
}
