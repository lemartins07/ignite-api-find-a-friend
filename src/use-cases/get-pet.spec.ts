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

import { GetPetUseCase } from './get-pet'

let petsRepository: InMemoryPetsRepository
let sut: GetPetUseCase

describe('Get Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetUseCase(petsRepository)
  })

  it('should get pet details', async () => {
    const petData = createPetData()
    const createdPet = await petsRepository.create(petData)

    const input = {
      petId: createdPet.id,
    }

    const { pet } = await sut.execute(input)

    expect(pet?.id).toEqual(createdPet.id)
  })

  it('should not get pet details with a nonexistent pet id.', async () => {
    const input = {
      petId: randomUUID(),
    }

    const { pet } = await sut.execute(input)

    expect(pet).toEqual(null)
  })
})

function createPetData() {
  return {
    age: PetAge.PUPPY,
    description: 'Pet description',
    energy_level: EnergyLevel.HIGH,
    independence_level: IndependenceLevel.HIGH,
    living_environment: LivingEnvironment.LARGE_SPACE,
    name: 'Pet Name',
    organizationId: randomUUID(),
    size: PetSize.GIANT,
  }
}
