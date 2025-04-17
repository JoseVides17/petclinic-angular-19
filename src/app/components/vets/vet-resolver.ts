import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import { VetService } from '../../services/vet.service';
import { Vet } from '../../models/vets/vet.model';

@Injectable({
  providedIn: 'root'
})
export class VetResolver  {

  constructor(private vetService: VetService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Vet> | Promise<Vet> | Vet {
    const vetId = route.paramMap.get('id') || '';
    return this.vetService.getVetById(vetId);
  }

}
