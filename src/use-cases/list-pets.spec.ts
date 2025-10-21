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

import { ListPetsUseCase } from './list-pets'

let petsRepository: InMemoryPetsRepository
let sut: ListPetsUseCase

describe('List Pets Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new ListPetsUseCase(petsRepository)
  })

  it('should list pets with basic filter', async () => {
    const petData = createPetData()
    await petsRepository.create(petData)

    const { pets } = await sut.execute({
      city: 'Manaus',
      state: 'AM',
    })

    expect(pets).toHaveLength(1)
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
