import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import { ZodError } from 'zod'

import { env } from './env'
import { organizationsRoutes } from './http/controllers/organizations/routes'
import { petsRoutes } from './http/controllers/pets/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(swagger, {
  openapi: {
    info: {
      title: 'Find a Friend API',
      description: 'Documentação dos endpoints',
      version: '1.0.0',
    },
    servers: [{ url: 'http://localhost:3333' }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer' },
        refreshTokenCookie: {
          type: 'apiKey',
          in: 'cookie',
          name: 'refreshToken',
        },
      },
    },
  },
})

app.register(swaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
  },
  staticCSP: true,
})

app.register(fastifyCookie)

app.register(organizationsRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
