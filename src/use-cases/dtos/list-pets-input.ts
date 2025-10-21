import { EnergyLevel, IndependenceLevel, PetAge, PetSize } from '@prisma/client'

export interface ListPetsInput {
  city: string
  state: string
  age?: PetAge
  energy_level?: EnergyLevel
  size?: PetSize
  independence_level?: IndependenceLevel
}
