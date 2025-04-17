import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/parts/welcome/welcome.component';
import { OwnerListComponent } from './components/owners/owner-list/owner-list.component';
import { AddOwnerComponent } from './components/owners/add-owner/add-owner.component';
import { VetListComponent } from './components/vets/vet-list/vet-list.component';
import { VetAddComponent } from './components/vets/add-vet/add-vet.component';
import { PettypeListComponent } from './components/pettypes/pet-type-list/pet-type-list.component';
import { PageNotFoundComponent } from './components/parts/page-not-found/page-not-found.component';
import { OwnerDetailComponent } from './components/owners/owner-detail/owner-detail.component';
import { OwnerEditComponent } from './components/owners/owner-edit/owner-edit.component';
import { PetAddComponent } from './components/pets/pet-add/pet-add.component';
import { PetEditComponent } from './components/pets/pet-edit/pet-edit.component';
import { VisitAddComponent } from './components/visits/visit-add/visit-add.component';
import { VisitEditComponent } from './components/visits/visit-edit/visit-edit.component';
import { VetEditComponent } from './components/vets/vet-edit/vet-edit.component';
import { VetResolver } from './components/vets/vet-resolver';
import { SpecResolver } from './components/specialties/specialties/spec-resolver';
import { PettypeAddComponent } from './components/pettypes/pettype-add/pet-type-add.component';
import { PettypeEditComponent } from './components/pettypes/pet-type-edit/pet-type-edit.component';
import { SpecialtyListComponent } from './components/specialties/specialties-list/specialties-list.component';
import { SpecialtyEditComponent } from './components/specialties/specialties-edit/specialties-edit.component';


export const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'owners', component: OwnerListComponent },
  { path: 'owners/add', component: AddOwnerComponent },
  {path: 'owners/:id', component: OwnerDetailComponent},
  {path: 'owners/:id/edit', component: OwnerEditComponent},
  {path: 'owners/:id/pets/add', component: PetAddComponent},
  { path: 'vets', component: VetListComponent },
  {path: 'vets/:id/edit', component: VetEditComponent, resolve: {vet: VetResolver, specs: SpecResolver}},
  { path: 'vets/add', component: VetAddComponent },
  { path: 'pettypes', component: PettypeListComponent },
  {path: 'pettypes/add', component: PettypeAddComponent},
  {path: 'pettypes/:id/edit', component: PettypeEditComponent},
  { path: 'specialties', component: SpecialtyListComponent },
  {path: 'specialties/:id/edit', component: SpecialtyEditComponent},
  {path: 'visits/:id/edit', component: VisitEditComponent},
  

  {
    path: 'pets/:id',
    children: [
      {
        path: 'edit',
        component: PetEditComponent
      },
      {
        path: 'visits\/add',
        component: VisitAddComponent
      }
    ]
  },
  
  // Ruta por defecto
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  
  // Ruta para cuando no se encuentra nada
  { path: '**', component: PageNotFoundComponent },
];
