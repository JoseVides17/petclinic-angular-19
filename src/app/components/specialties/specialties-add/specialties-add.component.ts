import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Specialty } from '../../../models/specialties/specialty.model';
import { SpecialtyService } from '../../../services/specialties/specialty.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-specialty-add',
  templateUrl: './specialties-add.component.html',
  styleUrls: ['./specialties-add.component.css'],
  imports: [CommonModule, FormsModule]
})
export class SpecialtyAddComponent implements OnInit {
  @ViewChild('specialityForm', { static: true }) specialityForm: NgForm | undefined;
  speciality: Specialty;
  addedSuccess = false;
  errorMessage: string | undefined;
  @Output() newSpeciality = new EventEmitter<Specialty>();

  constructor(private specialtyService: SpecialtyService) {
    this.speciality = {} as Specialty;
  }

  ngOnInit() {}

  onSubmit(specialty: Specialty) {
    this.specialtyService.addSpecialty(specialty).subscribe(
      (newSpecialty) => {
        this.speciality = newSpecialty;
        this.addedSuccess = true;
        this.newSpeciality.emit(this.speciality);
      },
      (error) => (this.errorMessage = error as any)
    );
  }
}
