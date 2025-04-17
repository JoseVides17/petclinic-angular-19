import {Component, Input, OnInit} from '@angular/core';
import { Visit } from '../../../models/visits/visit.model';
import { VisitService } from '../../../services/visits/visit.service';
import {Router} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visit-list',
  templateUrl: './visits-list.component.html',
  styleUrls: ['./visits-list.component.css'],
  imports: [CommonModule]
})
export class VisitListComponent implements OnInit {

  @Input() visits: Visit[];
  responseStatus: number | undefined;
  noVisits = false;
  errorMessage: string | undefined;

  constructor(private router: Router, private visitService: VisitService) {
    this.visits = [];
  }

  ngOnInit() {
  }

  editVisit(visit: Visit) {
    this.router.navigate(['/visits', visit.id, 'edit']);
  }

  deleteVisit(visit: Visit) {
    if (visit.id != null) {
      this.visitService.deleteVisit(visit.id.toString()).subscribe(
      response => {
        this.responseStatus = response;
        console.log('delete success');
        this.visits.splice(this.visits.indexOf(visit), 1 );
        if (this.visits.length === 0) {
            this.noVisits = true;
          }
          (error: any) => this.errorMessage = error as any});
      } else {
        console.error('Visit ID is undefined');
      }
    (error: any) => this.errorMessage = error as any;
  }

}
