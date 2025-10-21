import { PetsRepository } from '@/repositories/pets-repository'

import { ListPetsInput } from './dtos/list-pets-input'
import { ListPetsOutput } from './dtos/list-pets-output'

export class ListPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(filter: ListPetsInput): Promise<ListPetsOutput> {
    const pets = await this.petsRepository.list(filter)

    return {
      pets,
    }
  }
}
