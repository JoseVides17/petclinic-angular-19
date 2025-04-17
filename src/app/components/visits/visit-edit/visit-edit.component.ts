import {Component, OnInit} from '@angular/core';
import { Visit } from '../../../models/visits/visit.model';
import { Pet } from '../../../models/pets/pet.model';
import { Owner } from '../../../models/owners/owner.model';
import { PetType } from '../../../models/pettypes/pettype.model';
import { VisitService } from '../../../services/visits/visit.service';
import {ActivatedRoute, Router} from '@angular/router';

import moment from 'moment';
import { OwnerService } from '../../../services/owners/owner.service';
import {PetService} from '../../pets/pet.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpErrorHandler } from '../../../services/error.service';

@Component({
  selector: 'app-visit-edit',
  templateUrl: './visit-edit.component.html',
  styleUrls: ['./visit-edit.component.css'],
  imports: [CommonModule, FormsModule, MatDatepickerModule, MatNativeDateModule, HttpClientModule],
  providers: [VisitService, PetService, OwnerService, HttpClient, HttpErrorHandler]
})
export class VisitEditComponent implements OnInit {
  visit: Visit;
  currentPet: Pet;
  currentOwner: Owner;
  currentPetType: PetType;
  updateSuccess = false;
  errorMessage: string | undefined;

  constructor(private visitService: VisitService,
              private petService: PetService,
              private ownerService: OwnerService,
              private route: ActivatedRoute,
              private router: Router) {
    this.visit = {} as Visit;
    this.currentPet = {} as Pet;
    this.currentOwner = {} as Owner;
    this.currentPetType = {} as PetType;
  }

  ngOnInit() {
    const visitId = this.route.snapshot.params['id'];
    this.visitService.getVisitById(visitId).subscribe(
      visit => {
        this.visit = visit;
        if (visit.petId !== undefined) {
          this.petService.getPetById(visit.petId).subscribe(
            pet => {
              this.currentPet = pet;
              this.currentPetType = pet.type;
              this.ownerService.getOwnerById(pet.ownerId).subscribe(
                owner => {
                  this.currentOwner = owner;
                }
              )
            }
          );
        } else {
          this.errorMessage = 'Pet ID is undefined.';
        }
      },
      error => this.errorMessage = error as any);
  }

  onSubmit(visit: Visit) {
    visit.pet = this.currentPet;

    // format output from datepicker to short string yyyy-mm-dd format (rfc3339)
    visit.date = moment(visit.date).format('YYYY-MM-DD');

    if (visit.id) {
      this.visitService.updateVisit(visit.id.toString(), visit).subscribe(
        res => this.gotoOwnerDetail(),
        error => this.errorMessage = error as any);
    } else {
      this.errorMessage = 'Visit ID is undefined.';
    }

  }

  gotoOwnerDetail() {
    this.router.navigate(['/owners', this.currentOwner.id]);
  }

}
