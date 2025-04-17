import {Component, OnInit} from '@angular/core';
import { OwnerService } from '../../../services/owners/owner.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Owner } from '../../../models/owners/owner.model';
import { PetListComponent } from "../../pets/pet-list/pet-list.component";
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { HttpErrorHandler } from '../../../services/error.service';
import { PetService } from '../../pets/pet.service';
import { VisitService } from '../../../services/visits/visit.service';


@Component({
  selector: 'app-owner-detail',
  templateUrl: './owner-detail.component.html',
  styleUrls: ['./owner-detail.component.css'],
  imports: [PetListComponent, CommonModule, HttpClientModule],
  providers: [OwnerService, HttpClient, HttpErrorHandler, PetService, VisitService],
})
export class OwnerDetailComponent implements OnInit {
  errorMessage: string | undefined;
  owner: Owner;

  constructor(private route: ActivatedRoute, private router: Router, private ownerService: OwnerService) {
    this.owner = {} as Owner;
  }

  ngOnInit() {
    const ownerId = this.route.snapshot.params['id'];
    this.ownerService.getOwnerById(ownerId).subscribe(
      owner => this.owner = owner,
      error => this.errorMessage = error as any);
  }

  gotoOwnersList() {
    this.router.navigate(['/owners']);
  }

  editOwner() {
    this.router.navigate(['/owners', this.owner.id, 'edit']);
  }

  addPet(owner: Owner) {
    this.router.navigate(['/owners', owner.id, 'pets', 'add']);
  }
}