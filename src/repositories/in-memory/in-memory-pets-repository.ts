import { randomUUID } from 'node:crypto'

import { Pet } from '@prisma/client'

import { CreatePetInput } from '@/use-cases/dtos/create-pet-input'
import { ListPetsInput } from '@/use-cases/dtos/list-pets-input'

import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async list(filter: ListPetsInput): Promise<Pet[]> {
    const pets = this.items.filter((pet) => {
      if (filter.age && pet.age !== filter.age) {
        return false
      }

      if (filter.energy_level && pet.energy_level !== filter.energy_level) {
        return false
      }

      if (filter.size && pet.size !== filter.size) {
        return false
      }

      if (
        filter.independence_level &&
        pet.independence_level !== filter.independence_level
      ) {
        return false
      }

      return true
    })

    return pets
  }

  async create(data: CreatePetInput): Promise<Pet> {
    const {
      age,
      description,
      energy_level,
      independence_level,
      living_environment,
      name,
      organizationId,
      size,
    } = data

    const pet: Pet = {
      id: randomUUID(),
      age,
      description,
      energy_level,
      independence_level,
      living_environment,
      name,
      organizationId,
      size,
    }

    this.items.push(pet)

    return pet
  }
}
