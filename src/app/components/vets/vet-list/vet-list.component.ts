import {Component, OnInit} from '@angular/core';
import { Vet } from '../../../models/vets/vet.model';
import { VetService } from '../../../services/vet.service';
import {Router} from '@angular/router';
import { finalize } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpErrorHandler } from '../../../services/error.service';

@Component({
  selector: 'app-vet-list',
  templateUrl: './vet-list.component.html',
  styleUrls: ['./vet-list.component.css'],
  imports:[CommonModule, HttpClientModule],
  providers:[VetService, HttpClient, HttpErrorHandler]
})
export class VetListComponent implements OnInit {
  vets: Vet[];
  errorMessage: string | undefined;
  responseStatus: number | undefined;
  isVetDataReceived: boolean = false;

  constructor(private vetService: VetService, private router: Router) {
    this.vets = [];
  }

  ngOnInit() {
    this.vetService.getVets().pipe(
      finalize(() => {
        this.isVetDataReceived = true;
      })
    ).subscribe(
      vets => this.vets = vets,
      error => this.errorMessage = error as any);
  }

  deleteVet(vet: Vet) {
    if (vet?.id) {
      this.vetService.deleteVet(vet.id.toString()).subscribe(
        response => {
          this.responseStatus = response;
          this.vets = this.vets.filter(currentItem => currentItem.id !== vet.id);
        },
        error => this.errorMessage = error as any
      );
    } else {
      this.errorMessage = 'Vet ID is undefined';
    }
  }

  gotoHome() {
    this.router.navigate(['/welcome']);
  }

  addVet() {
    this.router.navigate(['/vets/add']);
  }

  editVet(vet: Vet) {
    this.router.navigate(['/vets', vet.id, 'edit']);
  }
}
