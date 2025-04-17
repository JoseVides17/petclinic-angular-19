import {Component, OnInit} from '@angular/core';
import { Specialty } from '../../../models/specialties/specialty.model';
import { SpecialtyService } from '../../../services/specialties/specialty.service';
import {ActivatedRoute, Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-specialty-edit',
  templateUrl: './specialties-edit.component.html',
  styleUrls: ['./specialties-edit.component.css'],
  imports:[FormsModule, CommonModule]
})
export class SpecialtyEditComponent implements OnInit {
  specialty: Specialty;
  errorMessage: string | undefined;

  constructor(private specialtyService: SpecialtyService, private route: ActivatedRoute, private router: Router) {
    this.specialty = {} as Specialty;
  }

  ngOnInit() {
    const specId = this.route.snapshot.params['id'];
    this.specialtyService.getSpecialtyById(specId).subscribe(
      specialty => this.specialty = specialty,
      error => this.errorMessage = error as any);
  }

  onSubmit(specialty: Specialty) {
    this.specialtyService.updateSpecialty(specialty.id.toString(), specialty).subscribe(
      res => {
        console.log('update success');
        this.onBack();
      },
      error => this.errorMessage = error as any);
 }

  onBack() {
    this.router.navigate(['/specialties']);
  }

}
