import { randomUUID } from 'node:crypto'

import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

import { prisma } from '@/lib/prisma'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  const email = `org-${randomUUID()}@example.com`

  const organization = await prisma.organization.create({
    data: {
      address: 'Porto Alegre - RS',
      email,
      password_hash: await hash('123456', 6),
      name: 'ACME',
      owner: 'John Doe',
      phone: '+5551994498100',
      zip_code: '12345-678',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email,
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
    organization,
  }
}
