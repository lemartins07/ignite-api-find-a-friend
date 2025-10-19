import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyOrganizationParam(paramKey: string) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { sub } = request.user ?? {}
    const routeOrganizationId = (request.params as Record<string, unknown>)[
      paramKey
    ]

    if (typeof sub !== 'string') {
      return reply.status(401).send({ message: 'Unauthorized.' })
    }

    if (typeof routeOrganizationId !== 'string') {
      return reply
        .status(400)
        .send({ message: 'Invalid organization identifier.' })
    }

    if (routeOrganizationId !== sub) {
      return reply.status(403).send({ message: 'Forbidden.' })
    }
  }
}
