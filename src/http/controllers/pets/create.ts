import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetParamsSchema = z.object({
    organizationId: z.string().uuid(),
  })

  const createBodySchema = z.object({
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE', 'GIANT']),
    age: z.enum(['PUPPY', 'ADULT', 'SENIOR']),
    description: z.string(),
    energy_level: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    independence_level: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    living_environment: z.enum(['SMALL_SPACE', 'MEDIUM_SPACE', 'LARGE_SPACE']),
    name: z.string(),
    pictures: z
      .array(
        z.object({
          path: z.string(),
        }),
      )
      .optional(),
    adoptionRequirements: z
      .array(
        z.object({
          description: z.string(),
        }),
      )
      .optional(),
  })

  createPetParamsSchema.parse(request.params)
  const organizationId = request.user.sub
  const data = createBodySchema.parse(request.body)

  const input = {
    data: {
      ...data,
      organizationId,
    },
  }

  const createPetUseCase = makeCreatePetUseCase()
  const { pet } = await createPetUseCase.execute(input)

  return reply.status(201).send({ pet })
}
