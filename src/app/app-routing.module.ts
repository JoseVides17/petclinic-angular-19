import { Routes } from '@angular/router';
import { OwnerListComponent } from './components/owners/owner-list/owner-list.component';

const routes: Routes = [
  { path: 'owners', component: OwnerListComponent },
  { path: '', redirectTo: '/owners', pathMatch: 'full' },
];
