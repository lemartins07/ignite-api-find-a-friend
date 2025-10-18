import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token, organization } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post(`/organization/${organization.id}/pets`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Jorginho',
        description: 'O gato mais lindo do mundo',
        age: 'PUPPY',
        size: 'SMALL',
        independence_level: 'LOW',
        living_environment: 'SMALL_SPACE',
        energy_level: 'LOW',
      })

    expect(response.statusCode).toEqual(201)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        organizationId: organization.id,
      }),
    )
  })
})
