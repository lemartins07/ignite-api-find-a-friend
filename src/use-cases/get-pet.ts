import { PetsRepository } from '@/repositories/pets-repository'

import { GetPetInput } from './dtos/get-pet-input'
import { GetPetOutput } from './dtos/get-pet-output'

export class GetPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(petId: GetPetInput): Promise<GetPetOutput> {
    const pet = await this.petsRepository.get(petId)

    return {
      pet,
    }
  }
}
