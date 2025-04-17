import { Component, OnInit } from '@angular/core';
import { PetType } from '../../../models/pettypes/pettype.model';
import { Router } from '@angular/router';
import { PetTypeService } from '../../../services/pettypes/pettype.service';
import { Specialty } from '../../../models/specialties/specialty.model';
import { finalize } from 'rxjs/operators';
import { PettypeAddComponent } from '../pettype-add/pet-type-add.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pettype-list',
  templateUrl: './pet-type-list.component.html',
  styleUrls: ['./pet-type-list.component.css'],
  imports: [PettypeAddComponent, CommonModule, FormsModule],
})
export class PettypeListComponent implements OnInit {
  pettypes: PetType[];
  errorMessage: string | undefined;
  responseStatus: number | undefined;
  isPetTypesDataReceived: boolean = false;
  isInsert = false;

  constructor(private pettypeService: PetTypeService, private router: Router) {
    this.pettypes = [] as PetType[];
  }

  ngOnInit() {
    this.pettypeService.getPetTypes().pipe(
      finalize(() => {
        this.isPetTypesDataReceived = true;
      })
    ).subscribe(
      pettypes => this.pettypes = pettypes,
      error => this.errorMessage = error as any
    );
  }

  deletePettype(pettype: PetType) {
    if (pettype.id !== undefined && pettype.id !== null) {
      this.pettypeService.deletePetType(pettype.id.toString()).subscribe(
        response => {
          this.responseStatus = response;
          this.pettypes = this.pettypes.filter(currentItem => !(currentItem.id === pettype.id));
          (error: any) => this.errorMessage = error as any
        },);
    } else {
      this.errorMessage = 'Pet type ID is undefined or null.';
    }
    (error: any) => this.errorMessage = error as any;
  }

  onNewPettype(newPetType: Specialty) {
    this.pettypes.push(newPetType);
    this.showAddPettypeComponent();
  }

  showAddPettypeComponent() {
    this.isInsert = !this.isInsert;
  }

  showEditPettypeComponent(updatedPetType: PetType) {
    if (updatedPetType.id !== undefined && updatedPetType.id !== null) {
      this.router.navigate(['/pettypes', updatedPetType.id.toString(), 'edit']);
    } else {
      this.errorMessage = 'Pet type ID is undefined or null.';
    }
  }

  gotoHome() {
    this.router.navigate(['/welcome']);
  }
}
