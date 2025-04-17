import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../../../services/owners/owner.service';
import { Owner } from '../../../models/owners/owner.model';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpErrorHandler } from '../../../services/error.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css'],
  imports: [CommonModule, HttpClientModule, FormsModule],
  providers: [OwnerService, HttpClient, HttpErrorHandler],
})
export class OwnerListComponent implements OnInit {
  errorMessage: string = '';
  lastName: string = '';
  owners: Owner[] = [];
  listOfOwnersWithLastName: Owner[] = [];
  isOwnersDataReceived: boolean = false;  

  constructor(private ownerService: OwnerService, private router: Router) { }

  ngOnInit() {
    this.ownerService.getOwners().pipe(
      finalize(() => {
        this.isOwnersDataReceived = true;
      }
    )).subscribe(
      owners => this.owners = owners,
      error => this.errorMessage = error as any);
  }

  addOwner() {
    this.router.navigate(['/owners/add']);
  }

  onSelect(owner: Owner) {
    this.router.navigate(['/owners', owner.id]);
  }

  loadOwners() {
    this.ownerService.getOwners().subscribe({
      next: (data) => {
        this.owners = data;
      },
      error: (error) => console.error('Error:', error),
    });
  }

  searchByLastName(lastName: string) {
    console.log('inside search by last name starting with ' + (lastName));
    if (lastName === '') {
      this.ownerService.getOwners()
        .subscribe(
          (owners) => {
            this.owners = owners;
          });
    }
    if (lastName !== '') {
      this.ownerService.searchOwners(lastName)
        .subscribe(
          (owners) => {

            this.owners = owners;
            console.log('this.owners ' + this.owners);

          },
          (error) => {
            this.owners = [];
          }
        );
    }
  }
}
