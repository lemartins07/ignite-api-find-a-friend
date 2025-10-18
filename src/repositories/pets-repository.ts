import { Pet } from '@prisma/client'

import { CreatePetInput } from '@/use-cases/dtos/create-pet-input'

export interface PetsRepository {
  create(data: CreatePetInput): Promise<Pet>
}
