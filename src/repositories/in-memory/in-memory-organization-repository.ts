import { randomUUID } from 'node:crypto'

import { Organization, Prisma } from '@prisma/client'

import { OrganizationsRepository } from '../organizations-repository'

export class InMemoryOrganizationRepository implements OrganizationsRepository {
  public items: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization: Organization = {
      id: randomUUID(),
      name: data.name,
      address: data.address,
      email: data.email,
      owner: data.owner,
      password_hash: data.password_hash,
      phone: data.phone,
      zip_code: data.zip_code,
      role: 'ADMIN',
      created_at: new Date(),
    }

    this.items.push(organization)

    return organization
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = this.items.find((org) => org.email === email)

    if (!organization) {
      return null
    }

    return organization
  }
}
