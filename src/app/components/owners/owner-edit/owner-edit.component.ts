import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../../../services/owners/owner.service';
import { Owner } from '../../../models/owners/owner.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpErrorHandler } from '../../../services/error.service';

@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css'],
  providers: [OwnerService, HttpClient, HttpErrorHandler],
  imports: [CommonModule, FormsModule, HttpClientModule],
})
export class OwnerEditComponent implements OnInit {
  owner: Owner;
  errorMessage: string | undefined;
  ownerId: number | undefined;
  constructor(
    private ownerService: OwnerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.owner = {} as Owner;
  }

  ngOnInit() {
    const ownerId = this.route.snapshot.params['id'];
    this.ownerService.getOwnerById(ownerId).subscribe(
      (owner) => (this.owner = owner),
      (error) => (this.errorMessage = error as any)
    );
  }

  onSubmit(owner: Owner) {
    const that = this;  
    const ownerId = this.route.snapshot.params['id'];
    this.ownerService.updateOwner(ownerId , owner).subscribe(
      (res) => this.gotoOwnerDetail(owner),
      (error) => (this.errorMessage = error as any)
    );
  }

  gotoOwnerDetail(owner: Owner) {
    this.errorMessage = undefined;
    this.router.navigate(['/owners', owner.id]);
  }
}
