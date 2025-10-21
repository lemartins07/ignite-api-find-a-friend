import { Pet, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { CreatePetInput } from '@/use-cases/dtos/create-pet-input'
import { GetPetInput } from '@/use-cases/dtos/get-pet-input'
import { ListPetsInput } from '@/use-cases/dtos/list-pets-input'

import { PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async get({ petId }: GetPetInput) {
    const pet = await prisma.pet.findFirst({
      where: {
        id: petId,
      },
    })

    return pet
  }

  async list(filter: ListPetsInput): Promise<Pet[]> {
    const { city, state, age, energy_level, size, independence_level } = filter

    const locationQuery = `${city} - ${state}`

    const where: Prisma.PetWhereInput = {
      Organization: {
        address: {
          contains: locationQuery,
          mode: 'insensitive',
        },
      },
    }

    if (age) {
      where.age = age
    }

    if (energy_level) {
      where.energy_level = energy_level
    }

    if (size) {
      where.size = size
    }

    if (independence_level) {
      where.independence_level = independence_level
    }

    const pets = await prisma.pet.findMany({
      where,
      include: {
        AdoptionRequirement: true,
        PetPicture: true,
      },
    })

    return pets
  }

  async create(data: CreatePetInput): Promise<Pet> {
    const { adoptionRequirements, pictures, ...petData } = data

    const pet = await prisma.pet.create({
      data: {
        ...petData,
        AdoptionRequirement:
          adoptionRequirements && adoptionRequirements.length > 0
            ? {
                create: adoptionRequirements.map((requirement) => ({
                  description: requirement.description,
                })),
              }
            : undefined,
        PetPicture:
          pictures && pictures.length > 0
            ? {
                create: pictures.map((picture) => ({
                  path: picture.path,
                })),
              }
            : undefined,
      },
    })

    return pet
  }
}
