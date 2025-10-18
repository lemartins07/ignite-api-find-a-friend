import { Pet } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { CreatePetInput } from '@/use-cases/dtos/create-pet-input'

import { PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create({ data }: CreatePetInput): Promise<Pet> {
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
