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
  // Authentication routes
  app.post(
    '/sessions',
    {
      schema: {
        summary: 'Authenticate an organization',
        tags: ['Authentication'],
        body: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Organization email used during registration',
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'Organization password',
            },
          },
          additionalProperties: false,
        },
        response: {
          200: {
            description: 'Authentication succeeded',
            type: 'object',
            properties: {
              token: {
                type: 'string',
                description: 'JWT access token to be used in protected routes',
              },
            },
            required: ['token'],
            additionalProperties: false,
          },
          400: {
            description: 'Invalid credentials supplied',
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
    authenticate,
  )
  app.patch(
    '/token/refresh',
    {
      schema: {
        summary: 'Refresh the access token using the refresh token cookie',
        tags: ['Authentication'],
        security: [{ refreshTokenCookie: [] }],
        response: {
          200: {
            description: 'Refresh succeeded',
            type: 'object',
            properties: {
              token: {
                type: 'string',
                description: 'New JWT access token',
              },
            },
            required: ['token'],
            additionalProperties: false,
          },
          401: {
            description: 'Refresh token missing or invalid',
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
    refresh,
  )
}
