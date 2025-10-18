import { randomUUID } from 'node:crypto'

import { Pet } from '@prisma/client'

import { CreatePetInput } from '@/use-cases/dtos/create-pet-input'

import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create({ data }: CreatePetInput): Promise<Pet> {
    const pet: Pet = {
      id: randomUUID(),
      age: data.age,
      description: data.description,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      living_environment: data.living_environment,
      name: data.name,
      organizationId: data.organizationId,
      size: data.size,
    }

    this.items.push(pet)

    return pet
  }
}
