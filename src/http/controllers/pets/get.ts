import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const getPetParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const getPetInput = getPetParamsSchema.parse(request.params)

  const getPetUseCase = makeGetPetUseCase()
  const { pet } = await getPetUseCase.execute(getPetInput)

  if (!pet) {
    return reply
      .status(404)
      .send({ message: 'No pet was found with the provided identifier' })
  }

  return reply.status(200).send({ pet })
}
