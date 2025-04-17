import {Component, OnInit} from '@angular/core';
import { Specialty } from '../../../models/specialties/specialty.model';
import { SpecialtyService } from '../../../services/specialties/specialty.service';
import { Vet } from '../../../models/vets/vet.model';
import {Router} from '@angular/router';
import { VetService } from '../../../services/vet.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpErrorHandler } from '../../../services/error.service';

@Component({
  selector: 'app-vet-add',
  templateUrl: './add-vet.component.html',
  styleUrls: ['./add-vet.component.css'],
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers:[SpecialtyService, HttpClient, HttpErrorHandler, VetService]
})
export class VetAddComponent implements OnInit {
  vet: Vet;
  specialtiesList: Specialty[];
  selectedSpecialty: Specialty;
  errorMessage: string | undefined;

  constructor(private specialtyService: SpecialtyService, private vetService: VetService, private router: Router) {
    this.vet = {} as Vet;
    this.selectedSpecialty = {} as Specialty;
    this.specialtiesList = [];
  }

  ngOnInit() {
    this.specialtyService.getSpecialties().subscribe(
      specialties => this.specialtiesList = specialties,
      error => this.errorMessage = error as any
    );
  }

  onSubmit(vet: Vet) {
    vet.id = undefined;
    vet.specialties = [];
    if (this.selectedSpecialty.id !== undefined) {
      vet.specialties.push(this.selectedSpecialty);
    }
    this.vetService.addVet(vet).subscribe(
      newVet => {
        this.vet = newVet;
        this.gotoVetList();
      },
      error => this.errorMessage = error as any
    );
  }

  gotoVetList() {
    this.router.navigate(['/vets']);
  }
}
