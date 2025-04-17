import {Component, OnInit} from '@angular/core';
import { Vet } from '../../../models/vets/vet.model';
import { VetService } from '../../../services/vet.service';
import {ActivatedRoute, Router} from '@angular/router';
import { SpecialtyService } from '../../../services/specialties/specialty.service';
import { Specialty } from '../../../models/specialties/specialty.model';
import {FormBuilder, FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpErrorHandler } from '../../../services/error.service';
import { VetResolver } from '../vet-resolver';
import { SpecResolver } from '../../specialties/specialties/spec-resolver';

@Component({
  selector: 'app-vet-edit',
  templateUrl: './vet-edit.component.html',
  styleUrls: ['./vet-edit.component.css'],
  imports:[CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatSelectModule, HttpClientModule],
  providers:[VetService, SpecialtyService, HttpErrorHandler, VetResolver, SpecResolver],
})
export class VetEditComponent implements OnInit {
  vetEditForm!: FormGroup;
  idCtrl: FormControl | undefined;
  firstNameCtrl: FormControl | undefined;
  lastNameCtrl: FormControl | undefined;
  specialtiesCtrl: FormControl | undefined;
  vet: Vet;
  specList: Specialty[];
  errorMessage: string | undefined;

  constructor(private formBuilder: FormBuilder, private specialtyService: SpecialtyService,
              private vetService: VetService, private route: ActivatedRoute, private router: Router) {
    this.vet = {} as Vet;
    this.specList = [] as Specialty[];
    this.buildForm();
  }

  buildForm() {
this.idCtrl = new FormControl(null);
    this.firstNameCtrl = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.lastNameCtrl = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.specialtiesCtrl = new FormControl(null);
    this.vetEditForm = this.formBuilder.group({
      id: this.idCtrl,
      firstName: this.firstNameCtrl,
      lastName: this.lastNameCtrl,
      specialties: this.specialtiesCtrl
    });
  }

  compareSpecFn(c1: Specialty, c2: Specialty): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  initFormValues() {
    if (this.vet) {
      if (this.idCtrl) {
        this.idCtrl.setValue(this.vet.id ?? null);
      }
      if (this.firstNameCtrl) {
        this.firstNameCtrl.setValue(this.vet.firstName ?? '');
      }
      if (this.lastNameCtrl) {
        this.lastNameCtrl.setValue(this.vet.lastName ?? '');
      }
      if (this.specialtiesCtrl) {
        this.specialtiesCtrl.setValue(this.vet.specialties ?? []);
      }
    }
  }

  ngOnInit() {
    this.specList = this.route.snapshot.data['specs'] || [];
    this.vet = this.route.snapshot.data['vet'] || { id: null, firstName: '', lastName: '', specialties: [] };
    this.initFormValues();
  }

  onSubmit(vet: Vet) {
    if (vet && vet.id) {
      this.vetService.updateVet(vet.id.toString(), vet).subscribe(
        res => {
          console.log('update success');
          this.gotoVetList();
        },
        error => this.errorMessage = error as any
      );
    } else {
      this.errorMessage = 'Vet ID is undefined';
    }
  }

  gotoVetList() {
    this.router.navigate(['/vets']);
  }

}
