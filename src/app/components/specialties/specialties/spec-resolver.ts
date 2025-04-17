

import {Injectable} from '@angular/core';
import { Specialty } from '../../../models/specialties/specialty.model';

import { SpecialtyService } from '../../../services/specialties/specialty.service';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SpecResolver  {

  constructor(private specialtyService: SpecialtyService) { }

  resolve(): Observable<Specialty[]> | Promise<Specialty[]> | Specialty[] {
    return this.specialtyService.getSpecialties();
  }

}
