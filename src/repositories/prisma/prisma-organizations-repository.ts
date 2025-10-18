import { Organization, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { OrganizationsRepository } from '../organizations-repository'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization = await prisma.organization.create({
      data,
    })

    return organization
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    return organization
  }
}
