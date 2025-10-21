import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeListPetsUseCase } from '@/use-cases/factories/make-list-pets-use-case'

const listPetsQuerySchema = z.object({
  city: z.string(),
  state: z.string(),
  age: z.enum(['PUPPY', 'ADULT', 'SENIOR']).optional(),
  energy_level: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  size: z.enum(['SMALL', 'MEDIUM', 'LARGE', 'GIANT']).optional(),
  independence_level: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
})

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const query = listPetsQuerySchema.parse(request.query)

  const listPetsUseCase = makeListPetsUseCase()
  const { pets } = await listPetsUseCase.execute(query)

  return reply.status(200).send({ pets })
}
