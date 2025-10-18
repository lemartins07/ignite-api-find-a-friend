import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/organizations').send({
      address: 'Address 1',
      email: 'org@email.com',
      password: '123456',
      name: 'ACME',
      owner: 'John Doe',
      phone: '+5551994498100',
      zip_code: '12345-678',
    })

    expect(response.statusCode).toEqual(201)
  })
})
