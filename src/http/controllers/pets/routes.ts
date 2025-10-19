import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { verifyOrganizationParam } from '@/http/middlewares/verify-organization'

import { create } from './create'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post(
    '/organization/:organizationId/pets',
    {
      preHandler: verifyOrganizationParam('organizationId'),
      schema: {
        summary: 'Register a new pet',
        tags: ['Pets'],
        security: [{ bearerAuth: [] }],
        body: {
          type: 'object',
          required: [
            'name',
            'description',
            'age',
            'size',
            'independence_level',
            'living_environment',
            'energy_level',
          ],
          properties: {
            name: {
              type: 'string',
              description: 'Pet name as it should appear in listings',
            },
            description: {
              type: 'string',
              description:
                'Short summary describing the pet personality and needs',
            },
            age: {
              type: 'string',
              enum: ['PUPPY', 'ADULT', 'SENIOR'],
              description: 'Pet life stage classification',
            },
            size: {
              type: 'string',
              enum: ['SMALL', 'MEDIUM', 'LARGE', 'GIANT'],
              description: 'Approximate adult size of the pet',
            },
            independence_level: {
              type: 'string',
              enum: ['LOW', 'MEDIUM', 'HIGH'],
              description: 'How independent the pet is on a daily basis',
            },
            living_environment: {
              type: 'string',
              enum: ['SMALL_SPACE', 'MEDIUM_SPACE', 'LARGE_SPACE'],
              description: 'Minimum recommended living environment',
            },
            energy_level: {
              type: 'string',
              enum: ['LOW', 'MEDIUM', 'HIGH'],
              description:
                'Pet energy level to assist adopters with compatibility',
            },
            pictures: {
              type: 'array',
              description: 'Optional list of pictures to showcase the pet',
              items: {
                type: 'object',
                required: ['path'],
                properties: {
                  path: {
                    type: 'string',
                    description:
                      'Relative or absolute URL pointing to the picture',
                  },
                },
                additionalProperties: false,
              },
            },
            adoptionRequirements: {
              type: 'array',
              description:
                'Additional requirements that adopters must comply with',
              items: {
                type: 'object',
                required: ['description'],
                properties: {
                  description: {
                    type: 'string',
                    description: 'Requirement detail presented to adopters',
                  },
                },
                additionalProperties: false,
              },
            },
          },
          additionalProperties: false,
        },
        response: {
          201: {
            description: 'Pet registered successfully',
            type: 'object',
            required: ['pet'],
            properties: {
              pet: {
                type: 'object',
                required: [
                  'id',
                  'organizationId',
                  'name',
                  'description',
                  'age',
                  'size',
                  'independence_level',
                  'living_environment',
                  'energy_level',
                ],
                properties: {
                  id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Unique identifier generated for the pet',
                  },
                  organizationId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Identifier of the pet organization',
                  },
                  name: { type: 'string' },
                  description: { type: 'string' },
                  age: { type: 'string', enum: ['PUPPY', 'ADULT', 'SENIOR'] },
                  size: {
                    type: 'string',
                    enum: ['SMALL', 'MEDIUM', 'LARGE', 'GIANT'],
                  },
                  independence_level: {
                    type: 'string',
                    enum: ['LOW', 'MEDIUM', 'HIGH'],
                  },
                  living_environment: {
                    type: 'string',
                    enum: ['SMALL_SPACE', 'MEDIUM_SPACE', 'LARGE_SPACE'],
                  },
                  energy_level: {
                    type: 'string',
                    enum: ['LOW', 'MEDIUM', 'HIGH'],
                  },
                },
                additionalProperties: true,
              },
            },
            additionalProperties: false,
          },
          400: {
            description: 'Validation error while creating the pet',
            type: 'object',
            required: ['message', 'issues'],
            properties: {
              message: { type: 'string' },
              issues: { type: 'object' },
            },
            additionalProperties: false,
          },
          401: {
            description: 'Authentication token missing or invalid',
            type: 'object',
            required: ['message'],
            properties: {
              message: { type: 'string' },
            },
            additionalProperties: false,
          },
        },
      },
    },
    create,
  )
}
