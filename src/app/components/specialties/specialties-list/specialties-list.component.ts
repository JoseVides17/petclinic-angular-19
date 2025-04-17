import {Component, OnInit} from '@angular/core';
import { Specialty } from '../../../models/specialties/specialty.model';
import { SpecialtyService } from '../../../services/specialties/specialty.service';
import {Router} from '@angular/router';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpecialtyAddComponent } from '../specialties-add/specialties-add.component';


@Component({
  selector: 'app-specialty-list',
  templateUrl: './specialties-list.component.html',
  styleUrls: ['./specialties-list.component.css'],
  imports:[CommonModule, FormsModule, SpecialtyAddComponent]
})
export class SpecialtyListComponent implements OnInit {
  specialties: Specialty[];
  errorMessage: string | undefined;
  responseStatus: number | undefined;
  isInsert = false;
  isSpecialitiesDataReceived: boolean = false;

  constructor(private specService: SpecialtyService, private router: Router) {
    this.specialties = [];
  }

  ngOnInit() {
    this.specService.getSpecialties().pipe(
      finalize(() => {
        this.isSpecialitiesDataReceived = true;
      })
    ).subscribe(
      specialties => this.specialties = specialties,
      error => this.errorMessage = error as any);
  }

  deleteSpecialty(specialty: Specialty) {
    this.specService.deleteSpecialty(specialty.id.toString()).subscribe(
      response => {
        this.responseStatus = response;
        this.specialties = this.specialties.filter(currentItem => !(currentItem.id === specialty.id));
      },
      error => this.errorMessage = error as any);
  }

  onNewSpecialty(newSpecialty: Specialty) {
    this.specialties.push(newSpecialty);
    this.showAddSpecialtyComponent();
  }

  showAddSpecialtyComponent() {
    this.isInsert = !this.isInsert;
  }

  showEditSpecialtyComponent(updatedSpecialty: Specialty) {
    this.router.navigate(['/specialties', updatedSpecialty.id.toString(), 'edit']);
  }

  gotoHome() {
    this.router.navigate(['/welcome']);
  }

}
