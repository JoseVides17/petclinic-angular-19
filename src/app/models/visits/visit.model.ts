import { Pet } from "../pets/pet.model";

export interface Visit {
  id?: number;
  date: string;
  description: string;
  pet: Pet;
  petId?: number;
}