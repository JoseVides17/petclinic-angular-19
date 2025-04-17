import { Owner } from '../owners/owner.model';
import { Visit } from '../visits/visit.model';
import { PetType } from '../pettypes/pettype.model';

export interface Pet {
  id?: number;
  ownerId: number;
  name: string;
  birthDate: string;
  type: PetType;
  owner: Owner;
  visits: Visit[];
}