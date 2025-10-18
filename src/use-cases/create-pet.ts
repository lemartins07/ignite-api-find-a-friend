import { PetsRepository } from '@/repositories/pets-repository'

import { CreatePetInput } from './dtos/create-pet-input'
import { CreatePetOutput } from './dtos/create-pet-output'

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(data: CreatePetInput): Promise<CreatePetOutput> {
    const pet = await this.petsRepository.create(data)

    return {
      pet,
    }
  }
}
