import { Component, Input, OnInit } from '@angular/core';
import { Pet } from '../../../models/pets/pet.model';
import { PetService } from '../pet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner } from '../../../models/owners/owner.model';
import { PetType } from '../../../models/pettypes/pettype.model';
import { PetTypeService } from '../../../services/pettypes/pettype.service';

import moment from 'moment';
import { OwnerService } from '../../../services/owners/owner.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { HttpErrorHandler } from '../../../services/error.service';

@Component({
  selector: 'app-pet-edit',
  templateUrl: './pet-edit.component.html',
  styleUrls: ['./pet-edit.component.css'],
  imports: [CommonModule, FormsModule, MatDatepickerModule, MatNativeDateModule, HttpClientModule],
  providers: [PetService, PetTypeService, OwnerService, HttpClient, HttpErrorHandler]
})
export class PetEditComponent implements OnInit {
  pet: Pet;
  @Input() currentType: PetType;
  currentOwner: Owner;
  petTypes: PetType[];
  errorMessage: string | undefined;

  constructor(private petService: PetService,
    private petTypeService: PetTypeService,
    private ownerService: OwnerService,
    private router: Router,
    private route: ActivatedRoute) {
    this.pet = {} as Pet;
    this.currentOwner = {} as Owner;
    this.currentType = {} as PetType;
    this.petTypes = [];
  }

  ngOnInit() {

    this.petTypeService.getPetTypes().subscribe(
      pettypes => this.petTypes = pettypes,
      error => this.errorMessage = error as any);

    const petId = this.route.snapshot.params['id'];
    this.petService.getPetById(petId).subscribe(
      pet => {
        this.pet = pet;
        this.ownerService.getOwnerById(pet.ownerId).subscribe(
          response => {
            this.currentOwner = response;
          });
        this.currentType = this.pet.type;
      },
      error => this.errorMessage = error as any);

  }

  onSubmit(pet: Pet) {
    pet.type = this.currentType;
    const that = this;
    // format output from datepicker to short string yyyy-mm-dd format (rfc3339)
    pet.birthDate = moment(pet.birthDate).format('YYYY-MM-DD');

    if (pet.id) {
      this.petService.updatePet(pet.id.toString(), pet).subscribe(
        error => this.errorMessage = error as any
      );
    } else {
      this.errorMessage = 'Pet ID is undefined.';
    };
  }

  gotoOwnerDetail(owner: Owner) {
    this.router.navigate(['/owners', owner.id]);
  }

}
