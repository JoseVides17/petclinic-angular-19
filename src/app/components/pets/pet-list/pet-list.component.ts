import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PetService } from '../pet.service';
import { Pet } from '../../../models/pets/pet.model';
import { CommonModule } from '@angular/common';
import { VisitListComponent } from '../../visits/visits-list/visits-list.component';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css'],
  imports: [CommonModule, VisitListComponent],
})
export class PetListComponent implements OnInit {
  errorMessage: string | undefined;
  @Input() pet: Pet;
  responseStatus: number | undefined;
  deleteSuccess = false;

  constructor(private router: Router, private petService: PetService) {
    this.pet = {} as Pet;
  }

  ngOnInit() {
  }

  editPet(pet: Pet) {
    this.router.navigate(['/pets', pet.id, 'edit']);
  }

  deletePet(pet: Pet) {
    if (pet.id) {
      this.petService.deletePet(pet.id.toString()).subscribe(
        response => {
          this.deleteSuccess = true;
          this.pet = {} as Pet;
          (error: any) => this.errorMessage = error as any
        });

    } else {
      this.errorMessage = 'Pet ID is undefined.';
    }
    (error: any) => this.errorMessage = error as any;

  }

  addVisit(pet: Pet) {
    this.router.navigate(['/pets', pet.id, 'visits', 'add']);
  }

}
