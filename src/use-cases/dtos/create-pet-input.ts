export interface CreatePetInput {
  organizationId: string
  name: string
  description: string
  age: 'PUPPY' | 'ADULT' | 'SENIOR'
  size: 'SMALL' | 'MEDIUM' | 'LARGE' | 'GIANT'
  independence_level: 'LOW' | 'MEDIUM' | 'HIGH'
  living_environment: 'SMALL_SPACE' | 'MEDIUM_SPACE' | 'LARGE_SPACE'
  energy_level: 'LOW' | 'MEDIUM' | 'HIGH'
  pictures?: { path: string }[]
  adoptionRequirements?: { description: string }[]
}
