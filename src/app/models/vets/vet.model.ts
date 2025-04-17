import { Specialty } from "../specialties/specialty.model";

export interface Vet {
  id?: number;
  firstName: string;
  lastName: string;
  specialties: Specialty[];
}
