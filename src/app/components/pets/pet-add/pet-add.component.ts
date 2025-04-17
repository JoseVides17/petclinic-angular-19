import {Component, Input, OnInit} from '@angular/core';
import { Pet } from '../../../models/pets/pet.model';
import { PetType } from '../../../models/pettypes/pettype.model';
import { Owner } from '../../../models/owners/owner.model';
import {ActivatedRoute, Router} from '@angular/router';
import { PetTypeService } from '../../../services/pettypes/pettype.service';
import {PetService} from '../pet.service';
import { OwnerService } from '../../../services/owners/owner.service';

import moment from 'moment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpErrorHandler } from '../../../services/error.service';

@Component({
  selector: 'app-pet-add',
  templateUrl: './pet-add.component.html',
  styleUrls: ['./pet-add.component.css'],
  imports: [CommonModule, FormsModule, MatDatepickerModule, MatNativeDateModule, HttpClientModule],
  providers: [PetService, PetTypeService, OwnerService, HttpClient, HttpErrorHandler]
})
export class PetAddComponent implements OnInit {
  pet: Pet;
  @Input() currentType: PetType;
  currentOwner: Owner;
  petTypes: PetType[];
  addedSuccess = false;
  errorMessage: string | undefined;

  constructor(private ownerService: OwnerService, private petService: PetService,
              private petTypeService: PetTypeService, private router: Router, private route: ActivatedRoute) {
    this.pet = {} as Pet;
    this.currentOwner = {} as Owner;
    this.currentType = {} as PetType;
    this.petTypes = [];
  }

  ngOnInit() {
    this.petTypeService.getPetTypes().subscribe(
      pettypes => this.petTypes = pettypes,
      error => this.errorMessage = error as any);

    const ownerId = this.route.snapshot.params['id'];
    this.ownerService.getOwnerById(ownerId).subscribe(
      response => {
        this.currentOwner = response;
      },
      error => this.errorMessage = error as any);
  }

  onSubmit(pet: Pet) {
    pet.id = undefined;
    pet.owner = this.currentOwner;
    // format output from datepicker to short string yyyy-mm-dd format (rfc3339)
    pet.birthDate = moment(pet.birthDate).format('YYYY-MM-DD');
    this.petService.addPet(pet).subscribe(
      newPet => {
        this.pet = newPet;
        this.addedSuccess = true;
        this.gotoOwnerDetail();
      },
      error => this.errorMessage = error as any);
  }

  gotoOwnerDetail() {
    this.router.navigate(['/owners', this.currentOwner.id]);
  }

}
