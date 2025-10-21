import { Pet } from '@prisma/client'

import { CreatePetInput } from '@/use-cases/dtos/create-pet-input'
import { ListPetsInput } from '@/use-cases/dtos/list-pets-input'

export interface PetsRepository {
  create(data: CreatePetInput): Promise<Pet>
  list(filter: ListPetsInput): Promise<Pet[]>
}
