import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Get Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet', async () => {
    const { token, organization } = await createAndAuthenticateUser(app, true)

    const createResponse = await request(app.server)
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

    const { pet } = createResponse.body

    const response = await request(app.server).get(`/pet/${pet.id}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: 'Jorginho',
        id: pet.id,
      }),
    )
  })
})
