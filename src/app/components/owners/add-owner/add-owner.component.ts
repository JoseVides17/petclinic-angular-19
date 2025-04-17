import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OwnerService } from '../../../services/owners/owner.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { HttpErrorHandler } from '../../../services/error.service';

@Component({
  selector: 'app-add-owner',
  templateUrl: './add-owner.component.html',
  styleUrls: ['./add-owner.component.css'],
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  providers: [OwnerService, HttpClient, HttpErrorHandler]
})
export class AddOwnerComponent implements OnInit {
  ownerForm!: FormGroup;
  owner: any;

  constructor(private fb: FormBuilder, private router: Router, private ownerService: OwnerService) { }

  ngOnInit(): void {
    this.ownerForm = this.fb.group({
      id: [''],
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$'), Validators.minLength(1), Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$'), Validators.minLength(1), Validators.maxLength(30)]],
      address: ['', [Validators.required, Validators.maxLength(255)]],
      city: ['', [Validators.required, Validators.maxLength(80)]],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(1), Validators.maxLength(20)]]
    });
  }

  onSubmit(): void {
    if (this.ownerForm.valid) {
      const owner = this.ownerForm.value;
      owner.id = null;
      this.ownerService.addOwner(owner).subscribe(
        newOwner => {
          this.owner = newOwner;
          this.gotoOwnersList();
        },
        error => this.getErrorMessage = error as any
      );
    }
  }

  gotoOwnersList(): void {
    this.router.navigate(['/owners']);
  }

  isInvalid(controlName: string): boolean {
    const control = this.ownerForm.get(controlName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  getErrorMessage(controlName: string): string {
    const control = this.ownerForm.get(controlName);
    if (control?.hasError('required')) return `${controlName} is required`;
    if (control?.hasError('minlength')) return `${controlName} is too short`;
    if (control?.hasError('maxlength')) return `${controlName} is too long`;
    if (control?.hasError('pattern')) return `${controlName} has invalid format`;
    return '';
  }
}
