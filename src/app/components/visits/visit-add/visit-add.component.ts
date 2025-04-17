import {Component, OnInit} from '@angular/core';
import { Visit } from '../../../models/visits/visit.model';
import { VisitService } from '../../../services/visits/visit.service';
import {ActivatedRoute, Router} from '@angular/router';
import { PetService } from '../../../services/pets/pet.service';
import { Pet } from '../../../models/pets/pet.model';
import { PetType } from '../../../models/pettypes/pettype.model';
import { Owner } from '../../../models/owners/owner.model';

import moment from 'moment';
import { OwnerService } from '../../../services/owners/owner.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpErrorHandler } from '../../../services/error.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { VisitListComponent } from "../visits-list/visits-list.component";

@Component({
  selector: 'app-visit-add',
  templateUrl: './visit-add.component.html',
  styleUrls: ['./visit-add.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule, MatDatepickerModule, MatNativeDateModule, VisitListComponent],
  providers: [VisitService, PetService, OwnerService, HttpClient, HttpErrorHandler]
})
export class VisitAddComponent implements OnInit {

  visit: Visit;
  currentPet: Pet;
  currentOwner: Owner;
  currentPetType: PetType;
  addedSuccess = false;
  errorMessage: string | undefined;

  constructor(private visitService: VisitService,
              private petService: PetService,
              private ownerService: OwnerService,
              private router: Router,
              private route: ActivatedRoute) {
    this.visit = {} as Visit;
    this.currentPet = {} as Pet;
    this.currentOwner = {} as Owner;
    this.currentPetType = {} as PetType;

  }

  ngOnInit() {
    console.log(this.route.parent);
    const petId = this.route.snapshot.params['id'];
    this.petService.getPetById(petId).subscribe(
      pet => {
        this.currentPet = pet;
        this.visit.pet = this.currentPet;
        this.currentPetType = this.currentPet.type;
        this.ownerService.getOwnerById(pet.ownerId).subscribe(
          owner => {
            this.currentOwner = owner;
          }
        )
      },
      error => this.errorMessage = error as any);
  }

  onSubmit(visit: Visit) {
    visit.id = undefined;
    const that = this;

    // format output from datepicker to short string yyyy-mm-dd format (rfc3339)
    visit.date = moment(visit.date).format('YYYY-MM-DD');

    this.visitService.addVisit(visit).subscribe({
      next: (newVisit) => {
        this.visit = newVisit;
        this.addedSuccess = true;
        this.gotoOwnerDetail();
      },
      error: (error) => {
        this.errorMessage = error as any;
      }
    });
    
  }

  gotoOwnerDetail() {
    this.router.navigate(['/owners', this.currentOwner.id]);
  }

}
