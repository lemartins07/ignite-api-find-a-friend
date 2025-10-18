import { randomUUID } from 'node:crypto'

import {
  EnergyLevel,
  IndependenceLevel,
  LivingEnvironment,
  PetAge,
  PetSize,
} from '@prisma/client'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

import { CreatePetUseCase } from './create-pet'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should to create pet', async () => {
    const petData = createPetData()

    const { pet } = await sut.execute(petData)

    expect(pet.id).toEqual(expect.any(String))
  })
})

function createPetData() {
  return {
    data: {
      age: PetAge.PUPPY,
      description: 'Pet description',
      energy_level: EnergyLevel.HIGH,
      independence_level: IndependenceLevel.HIGH,
      living_environment: LivingEnvironment.LARGE_SPACE,
      name: 'Pet Name',
      organizationId: randomUUID(),
      size: PetSize.GIANT,
    },
  }
}
