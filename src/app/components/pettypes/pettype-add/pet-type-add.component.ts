import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { PetType } from '../../../models/pettypes/pettype.model';
import { PetTypeService } from '../../../services/pettypes/pettype.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pettype-add',
  templateUrl: './pet-type-add.component.html',
  styleUrls: ['./pet-type-add.component.css'],
  imports: [CommonModule, FormsModule]
})
export class PettypeAddComponent implements OnInit {
  pettype: PetType;
  errorMessage: string | undefined;
  @Output() newPetType = new EventEmitter<PetType>();

  constructor(private pettypeService: PetTypeService) {
    this.pettype = {} as PetType;
  }

  ngOnInit() {
  }

  onSubmit(pettype: PetType) {
    pettype.id;
    this.pettypeService.addPetType(pettype).subscribe(
      newPettype => {
        this.pettype = newPettype;
        this.newPetType.emit(this.pettype);
      },
      error => this.errorMessage = error as any
    );
  }

}
