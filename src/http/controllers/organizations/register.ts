import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeOrganizationRegisterUseCase } from '@/use-cases/factories/make-organization-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    owner: z.string(),
    email: z.string().email(),
    zip_code: z.string().length(9),
    address: z.string(),
    phone: z.string().length(14),
    password: z.string().min(6),
    role: z.enum(['ADMIN', 'MEMBER']).default('ADMIN'),
  })

  const { address, email, name, owner, password, phone, zip_code, role } =
    registerBodySchema.parse(request.body)

  try {
    const organizationRegisterUseCase = makeOrganizationRegisterUseCase()

    await organizationRegisterUseCase.execute({
      address,
      email,
      name,
      owner,
      password,
      phone,
      zip_code,
      role,
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
