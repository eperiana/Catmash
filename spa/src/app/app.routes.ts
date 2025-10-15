import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { CatCardListComponent } from './cat-card-list/cat-card-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'hiscore', pathMatch: 'full' },
  { path: 'hiscore', component: CatCardListComponent },
  { path: '**', component: NotFoundComponent }
];