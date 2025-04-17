import {Component, OnInit} from '@angular/core';
import { PetType } from '../../../models/pettypes/pettype.model';
import { PetTypeService } from '../../../services/pettypes/pettype.service';
import {ActivatedRoute, Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pettype-edit',
  templateUrl: './pet-type-edit.component.html',
  styleUrls: ['./pet-type-edit.component.css'],
  imports:[CommonModule, FormsModule]
})
export class PettypeEditComponent implements OnInit {
  pettype: PetType;
  errorMessage: string | undefined;

  constructor(private pettypeService: PetTypeService, private route: ActivatedRoute, private router: Router) {
    this.pettype = {} as PetType;
  }

  ngOnInit() {
    const pettypeId = this.route.snapshot.params['id'];
    this.pettypeService.getPetTypeById(pettypeId).subscribe(
      pettype => this.pettype = pettype,
      error => this.errorMessage = error as any);
  }

  onSubmit(pettype: PetType) {
    this.pettypeService.updatePetType(pettype.id.toString(), pettype).subscribe(
      res => {
        console.log('update success');
        this.onBack();
      },
      error => this.errorMessage = error as any);

  }

  onBack() {
    this.router.navigate(['/pettypes']);
  }

}
