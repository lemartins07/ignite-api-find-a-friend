import { Pet } from '@prisma/client'

export interface ListPetsOutput {
  pets: Pet[]
}
