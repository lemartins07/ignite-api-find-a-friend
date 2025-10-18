import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/organizations').send({
      address: 'Address 1',
      email: 'org@email.com',
      password: '123456',
      name: 'ACME',
      owner: 'John Doe',
      phone: '+5551994498100',
      zip_code: '12345-678',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'org@email.com',
      password: '123456',
    })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })

  it('should not be able to authenticate with wrong password', async () => {
    await request(app.server).post('/organizations').send({
      address: 'Address 1',
      email: 'org@email.com',
      password: '123456',
      name: 'ACME',
      owner: 'John Doe',
      phone: '+5551994498100',
      zip_code: '12345-678',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.status).toEqual(400)
    expect(response.body.message).toEqual(new InvalidCredentialsError().message)
  })
})
