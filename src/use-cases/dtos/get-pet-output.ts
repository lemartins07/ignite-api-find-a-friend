import { Pet } from '@prisma/client'

export interface GetPetOutput {
  pet: Pet | null
}
