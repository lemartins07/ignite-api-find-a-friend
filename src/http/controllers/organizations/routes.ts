import { FastifyInstance } from 'fastify'

import { authenticate } from './authenticate'
import { refresh } from './refresh'
import { register } from './register'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post(
    '/organizations',
    {
      schema: {
        summary: 'Register a new organization',
        tags: ['Organizations'],
        body: {
          type: 'object',
          required: [
            'name',
            'owner',
            'email',
            'zip_code',
            'address',
            'phone',
            'password',
          ],
          properties: {
            name: { type: 'string', description: 'Organization trade name' },
            owner: { type: 'string', description: 'Responsible person name' },
            email: {
              type: 'string',
              format: 'email',
              description: 'Organization contact email',
            },
            zip_code: {
              type: 'string',
              minLength: 9,
              maxLength: 9,
              pattern: '^\\d{5}-\\d{3}$',
              description: 'Postal code following the 00000-000 format',
            },
            address: {
              type: 'string',
              description: 'Street, number and complement information',
            },
            phone: {
              type: 'string',
              minLength: 14,
              maxLength: 14,
              description: 'Contact phone number including area code',
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'Password with at least 6 characters',
            },
          },
          additionalProperties: false,
        },
        response: {
          201: {
            description: 'Organization registered successfully',
            type: 'null',
          },
          409: {
            description: 'Organization already exists',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
            required: ['message'],
            additionalProperties: false,
          },
        },
      },
    },
    register,
  )
  // Aunthentication routes
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)
}
